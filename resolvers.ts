import { Collection,ObjectId } from "mongodb";
import { cityAPI, RestaurantModel } from "./types.ts";
import { getCity, getWeather, getCountry } from "./utils.ts";
import{GraphQLError} from "graphql";

type context ={
    RestaurantsCollection: Collection<RestaurantModel>
}

type AddRestaurantMutationArgs = {
    name:string,
    address:string,
    weather:string,
    phone:string,
    city:string,
}

export const resolvers={
    Restaurant: {
        id:(parent:RestaurantModel) => parent._id!.toString,
        address:(parent:RestaurantModel)=> `${parent.address},${parent.city},${parent.country}`,
        weather:async (parent:RestaurantModel,_:unknown,ctx:context)=> {
            const { latitude, longitude } = parent;
            return await getWeather(latitude, longitude);
        },   
    },

    Query: {
        getRestaurants: async(
            _:unknown,
            {city}:{city:string},
            ctx: context,
        ):Promise<RestaurantModel[]> =>{
            return await ctx.RestaurantsCollection.find({city}).toArray()
        },

        getRestaurant: async(
            _:unknown,
            {id}:{id:string},
            ctx: context,
        ):Promise<RestaurantModel | null>=>{
            return await ctx.RestaurantsCollection.findOne({ _id: new ObjectId(id)})
        },
    },

    Mutation: {
        addRestaurant: async(
        _:unknown,
        args: AddRestaurantMutationArgs,
        ctx: context,

     ):Promise<RestaurantModel | null>=>{
         const {name, address,weather,phone, city} = args
         const phoneExists = await ctx.RestaurantsCollection.findOne({phone});
         if(phoneExists)   {
            throw new GraphQLError("The phone number is already registered")
         }
         
         const cityExists = await getCity(city);
         if(!cityExists){
            throw new GraphQLError("Introduced city is not valid")
         }
         const {latitude, longitude, country} = cityExists

         const {insertedId} = await ctx.RestaurantsCollection.insertOne({
        name,
        address,
        phone,
        city,
        country,
        latitude,
        longitude,
         });

         return {
            _id: insertedId,
            name,
            address,
            phone,
            city,
            country,
            latitude,
            longitude,
         }
            
     }} 
     
}