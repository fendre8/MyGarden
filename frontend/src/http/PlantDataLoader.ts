import axios from "axios";
import { ErrorModel } from "../Models/common/ErrorModel";
import Plant from "../Models/Plant/Plant";
import { baseUrl, headers } from "./SettingsLoader";


export const getPlants = async (plantName: string): Promise<Plant[] | undefined> => {
    return await axios
        .get(baseUrl + "plant/" + plantName, {
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