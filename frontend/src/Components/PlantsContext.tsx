import React, { createContext, useState } from "react";
import Plant from "../Models/Plant/Plant";

type PlantContent = {
    _plants: Plant[];
    _setPlants(_plants: Plant[]): void;
}

export const PlantsContext = createContext<PlantContent | undefined>(undefined)

export const PlantsProvider: React.FC = ({ children }) => {
    const [plants, setPlants] = useState<Plant[]>([])

    const plantContent : PlantContent = {
        _plants: plants,
        _setPlants: setPlants
    };

    return (
        <PlantsContext.Provider value={plantContent} >
            {children}
        </PlantsContext.Provider>
    )
}