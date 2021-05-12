import React, { createContext, useState } from "react";
import Plant from "../Models/Plant/Plant";

type PlantContent = {
    plants: Plant[];
    setPlants(_plants: Plant[]): void;
}

export const PlantsContext = createContext<PlantContent | undefined>(undefined)

export const PlantsProvider = (props: { children: React.ReactChild | React.ReactFragment }) => {
    const [plants, setPlants] = useState<Plant[]>([
        // { 
        //     id : 1,
        //     description: "",
        //     first_harvest_exp: "1",
        //     height: 1,
        //     img_url: "",
        //     last_harvest_exp: "",
        //     median_lifespan: "",
        //     name: "asd",
        //     row_spacing: 0,
        //     scientific_name: "",
        //     sowing_method: "",
        //     spread: 0,
        //     sun_requirements: "",
        // }
    ])

    const plantContent : PlantContent = {
        plants: plants,
        setPlants: setPlants
    };

    return (
        <PlantsContext.Provider value={plantContent} >
            {props.children}
        </PlantsContext.Provider>
    )
}