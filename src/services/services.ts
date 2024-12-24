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
  filter: "all" | "for_rent" | "for_sale"
): Promise<Property[]> => {
  try {
    const allProperties = await fetchProperties();

    switch (filter) {
      case "for_rent":
        return allProperties.filter(
          (property) => property.status.includes(PropertyStatus.ForRent)
        );

      case "for_sale":
        return allProperties.filter(
          (property) => property.status.includes(PropertyStatus.ForSale)
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

export const fetchPinnedProperties = async (): Promise<Property[]> => {
  try {
    const allProperties = await fetchProperties();
    return allProperties.filter((property) => property.pinned === true);
  } catch (error) {
    console.error("Error al cargar las propiedades destacadas:", error);
    return [];
  }
};
