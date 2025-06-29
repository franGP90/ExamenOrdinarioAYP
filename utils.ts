import { isDataView } from "node:util/types";
import { weatherAPI, cityAPI, countryAPI, localtimeAPI } from "./types.ts";

export const getCity = async(
    name:string
):Promise<Array<{latitude:string, longitude:string, country:string }>> =>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI";
    if(!API_KEY){
        throw new Error("API_KEY is not defined")
    }

    const url = `https://api.api-ninjas.com/v1/city?name=${name}`
    const response = await fetch(url, {
        headers:{
        "X-Api-Key":API_KEY,
    },
        
    })

    if(!response.ok){
        throw new Error("Failed to fetch city");       
    }

    const data:cityAPI = await response.json();
    
   const result = await Promise.all(
        data.map(async(city) =>{
            return{latitude: city.latitude, longitude: city.longitude, country:city.country}
        }  
        ) 
    );
 return result
}

export const getWeather = async(
    latitude:string,
    longitude:string
):Promise<number> =>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"
    if(!API_KEY){
        throw new Error("API_KEY is not defined")
    }

    const url =`https://api.api-ninjas.com/v1/weather?lat=${latitude}&lon=${longitude}`
    const response = await fetch(url,{
        headers:{
            "X-APi-key": API_KEY,
        },
    })
    if(!response.ok){
        throw new Error("Failed to fetch weather")
    }

    const data:weatherAPI = await response.json();
    return data.temp;

}

export const getCountry = async(
    name:string
):Promise<countryAPI>=>{
    const API_KEY= "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI";
    if(!API_KEY){
        throw new Error("API_KEY not specified")
    }

    const url = `https://api.api-ninjas.com/v1/country?name=${name}`
    const response = await fetch(url,{
        headers:{
            "X-Api-Key":API_KEY
        }
    })

    if(!response.ok){
        throw new Error("Country not found")
    }

    const data: countryAPI = await response.json();
    return data;
}

export const getLocaltime = async(
    city:string
):Promise<string>=>{
    const API_KEY = "fvnsynmnoJGgoY7r5cLH2w==qPZBPBN0FtBPbnQI"

    const cityExists = await getCity(city);
    const cityData = cityExists.at(0)
    if(!cityData){throw new Error("No se han podido obtener los datos de la ciudad")}
    const {latitude, longitude} = cityData

    const url = `https://api.api-ninjas.com/v1/worldtime?lat=${latitude}&lon=${longitude}`


    const response = await fetch(url,
     {
        headers:{
        "X-Api-Key":API_KEY
     }   
     })

      if(!response.ok){
        throw new Error("Failed to fetch timezone")
    }

    const data:localtimeAPI = await response.json()
    const result:string = data.toString()
    if(!data.local_time){
        throw new Error("No se ha podido obtener el tiempo local \n" + result)
    }
    return data.local_time;
}