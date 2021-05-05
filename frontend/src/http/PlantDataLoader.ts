import axios from "axios";
import Plant from "../Models/Plant/Plant";
import { baseUrl, headers } from "./SettingsLoader";


export const getPlants = async (plantName: string): Promise<Plant[] | undefined> => {
    return await axios
        .get(baseUrl + "plant/name/" + plantName, {
            headers: headers
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Baj van!");
            return undefined;
        })
};

export const getUserPlants = async (username: string): Promise<Plant[]> => {
    return await axios
        .get(baseUrl + "profiles/name/" + username + "/plants", 
        { headers: headers })
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log("Nincs növényed");
            return undefined;
        });
};

export const getPlantById = async (id: number): Promise<Plant> => {
    return await axios
        .get(baseUrl + "plant/id/" + id, 
        { headers: headers})
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(`Nincs ${id}-s növény`);
            return err;
        });
};

export const addNewPlant = async (username: string, plant: string): Promise<Plant> => {
    return await axios
        .post(baseUrl + "profiles/name/" + username + "/plant",{ plantName : plant },
        { headers: headers })
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .catch(err => {
            console.log("Nem sikerült feltölteni");
        })
}