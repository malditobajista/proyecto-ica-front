import React, { createContext, useState, useContext, ReactNode } from "react";
import { Property } from "../utils/types";
import { fetchProperties } from "../services/services";

interface PropertyContextType {
    properties: Property[];
    fetchAllProperties: () => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [properties, setProperties] = useState<Property[]>([]);

    const fetchAllProperties = async () => {
        try {
            const data = await fetchProperties();
            setProperties(data);
        } catch (error) {
            console.error("Error al cargar las propiedades:", error);
        }
    };

    return (
        <PropertyContext.Provider value={{ properties, fetchAllProperties }}>
            {children}
        </PropertyContext.Provider>
    );
};

export const useProperties = (): PropertyContextType => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error("useProperties debe ser usado dentro de un PropertyProvider");
    }
    return context;
};
