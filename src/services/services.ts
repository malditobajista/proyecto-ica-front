export interface Property {
  id: number;
  title: string;
  imageSrc: string[];
  description: string;
  status: string;
  price: string;
  type: string;
}

const API_URL = "/api/property/home";

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Error al obtener las propiedades");
    }
    const data: Property[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    return [];
  }
};

