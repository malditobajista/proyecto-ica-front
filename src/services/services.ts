import propiedades from "../assets/placeholderPropiedades";
import { Property } from "../utils/types";

// const API_URL = "/api/property/home";
const MOCKED_PROPERTIES: Property[] = propiedades;

export const fetchProperties = async (filter?: string): Promise<Property[]> => {
  try {
    /*
    // const response = await fetch(API_URL);
    // if (!response.ok) {
    //   throw new Error("Error al obtener las propiedades");
    // }
    // const data: Property[] = await response.json();
    // return data;
    */
    let filteredProperties = MOCKED_PROPERTIES;
    if (filter) {
      switch (filter) {
        case "for-rent":
          filteredProperties = MOCKED_PROPERTIES.filter(
            (property) => property.status === "en alquiler"
          );
          break;
        case "for-sale":
          filteredProperties = MOCKED_PROPERTIES.filter(
            (property) => property.status === "en venta"
          );
          break;
        default:
          console.warn(`Filtro desconocido: ${filter}`);
      }
    }
    return Promise.resolve(filteredProperties);
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    return [];
  }
};

// export const fetchPropertyById = async (id: string): Promise<Property> => {
//   const response = await fetch(`/api/properties/${id}`);
//   console.log(">>> ", response);

//   if (!response.ok) {
//     throw new Error("Error al obtener los detalles de la propiedad");
//   }
//   return response.json();
// };

export const fetchPropertyById = async (id: string): Promise<Property> => {
  const propertyId = parseInt(id, 10);
  const property = propiedades.find((prop) => prop.id === propertyId);

  if (!property) {
    throw new Error("Error al obtener los detalles de la propiedad");
  }
  return Promise.resolve(property);
};

