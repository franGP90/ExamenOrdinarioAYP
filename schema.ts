export const typeDefs = `#graphql
type Restaurant{
    id: ID!
    name:String!,
    address:String!,
    weather:Int!,
    phone:String!,
    local_time:String!
}

type Query{
 getRestaurants(city:String!): [Restaurant!]!
 getRestaurant(id:ID!):Restaurant
}

type Mutation{
    deleteRestaurant(id:ID!): Boolean!
    addRestaurant(name:String!,address:String!,phone:String!, city:String!):Restaurant
}
`;