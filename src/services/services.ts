// import propiedades from "../assets/placeholderPropiedades";
// import { Property } from "../utils/types";

// // const API_URL = "/api/property/home";
// const MOCKED_PROPERTIES: Property[] = propiedades;

// export const fetchProperties = async (): Promise<Property[]> => {
//   try {
//     return MOCKED_PROPERTIES; // Retorna todas las propiedades sin filtrar
//   } catch (error) {
//     console.error("Error al cargar las propiedades:", error);
//     return [];
//   }
// };

// export const fetchPropertiesByStatus = async (
//   filter: "all" | "for-rent" | "for-sale"
// ): Promise<Property[]> => {
//   try {
//     const allProperties = await fetchProperties(); // Obtener todas las propiedades

//     switch (filter) {
//       case "for-rent":
//         return allProperties.filter(
//           (property) => property.status === "for_rent"
//         );

//       case "for-sale":
//         return allProperties.filter(
//           (property) => property.status === "for_sale"
//         );

//       case "all":
//         return allProperties;
//       default:
//         return allProperties;
//     }
//   } catch (error) {
//     console.error("Error al filtrar las propiedades:", error);
//     return [];
//   }
// };
// // export const fetchPropertyById = async (id: string): Promise<Property> => {
// //   const response = await fetch(`/api/properties/${id}`);
// //   console.log(">>> ", response);

// //   if (!response.ok) {
// //     throw new Error("Error al obtener los detalles de la propiedad");
// //   }
// //   return response.json();
// // };

// export const fetchPropertyById = async (id: string): Promise<Property> => {
//   const propertyId = parseInt(id, 10);
//   const property = propiedades.find((prop) => prop.id === propertyId);

//   if (!property) {
//     throw new Error("Error al obtener los detalles de la propiedad");
//   }
//   return Promise.resolve(property);
// };

import propiedades from "../assets/placeholderPropiedades";
import { Property, PropertyStatus } from "../utils/types";

// const API_URL = "/api/property/home";
const MOCKED_PROPERTIES: Property[] = propiedades;

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    return MOCKED_PROPERTIES;
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
};

export const fetchPropertiesByStatus = async (
  filter: "all" | "for-rent" | "for-sale"
): Promise<Property[]> => {
  try {
    const allProperties = await fetchProperties();

    switch (filter) {
      case "for-rent":
        return allProperties.filter(
          (property) => property.status === PropertyStatus.ForRent
        );

      case "for-sale":
        return allProperties.filter(
          (property) => property.status === PropertyStatus.ForSale
        );

      case "all":
        return allProperties;
      default:
        return allProperties;
    }
  } catch (error) {
    console.error("Error al filtrar las propiedades:", error);
    return [];
  }
};

export const fetchPropertyById = async (id: string): Promise<Property> => {
  const propertyId = parseInt(id, 10);
  const property = propiedades.find((prop) => prop.id === propertyId);

  if (!property) {
    throw new Error("Error al obtener los detalles de la propiedad");
  }
  return Promise.resolve(property);
};

