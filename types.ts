import {OptionalId} from "mongodb"

export type RestaurantModel = OptionalId<{
    name:string,
    address:string,
    city:string,
    country:string,
    phone:string,
    latitude: string;
  longitude: string;
  local_time: string;
}>

export type weatherAPI = {temp:number}

export type cityAPI = Array<{latitude:string, longitude:string, country:string}>

export type localtimeAPI = {local_time:string}
export type countryAPI = {country:string}