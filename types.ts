import {OptionalId} from "mongodb"

export type RestaurantModel = OptionalId<{
    name:string,
    address:string,
    city:string,
    country:string,
    phone:string,
    latitude: string;
  longitude: string;
}>

export type weatherAPI = {temp:number}

export type cityAPI = Array<{latitude:string, longitude:string, country:string}>

export type countryAPI = {country:string}