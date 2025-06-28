export const schema = `#graphql
type Restaurant{
    id: ID!
    name:String!,
    address:String!,
    weather:String!,
    phone:String!,
    localTime:String!
}

type Query{
 getRestaurants(city:string!): [Restaurant!]!
 getRestaurant(id:ID!):Restaurant
}

type Mutation{
    deleteRestaurant(id:ID!): Boolean!
    addRestaurant(name:String!,address:String!,phone:String!):Restaurant
}
`