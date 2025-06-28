import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema.ts";
import { MongoClient } from "mongodb";
import { RestaurantModel } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

const MONGO_URL = Deno.env.get("MONGO_URL")

if(!MONGO_URL){
  throw new Error("Mongo url is not defined")
}
try{
const mongoClient = new MongoClient(MONGO_URL)
await mongoClient.connect

const mongodb = mongoClient.db("ExamenOrdinario")

const RestaurantsCollection = mongodb.collection<RestaurantModel>("Restaurantes")

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ RestaurantsCollection }),
});

console.info(`Server ready at ${url}`);

}catch(e){
  throw new Error("Fallo al conectarse a la base de datos")
}
