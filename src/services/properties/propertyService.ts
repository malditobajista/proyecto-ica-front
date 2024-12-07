import { Property, PropertyCardProps } from "../../utils/types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";
export const createProperty = async (propertyData: Omit<PropertyCardProps, 'id'>, files: File[]) => {
  const formData = new FormData();

  console.log('propertyData:', propertyData);
  console.log('files:', files);

  // Agregar campos de datos
  formData.append("property", JSON.stringify(propertyData));

  // Agregar archivos de imagen
  files.forEach((file) => formData.append("files", file));

  // Mostrar el contenido del formData para depuración
  console.log('Contenido de formData:');
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  return await axios.post(`${BASE_URL}/property/create`, formData, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnZXJhcmRvQGdtYWlsLmNvbSIsImlhdCI6MTczMzI1MTcxNiwiZXhwIjoxNzMzMzM4MTE2fQ.myfbketR6yJveJijgAf1zAUIDdnlDGLHfsGPKro8FT4",
      "Content-Type": "multipart/form-data"
    },
  });
};

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/property/findAll`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
};

export const fetchProperty = async (id: number): Promise<Property[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/property/${id}`);
    
    return response.data;
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
};

export const fetchTermsAndConditions = async (): Promise<string> => {
  try {
    const response = await axios.get(`${BASE_URL}/property/terms`);
    return response.data;
  } catch (error) {
    console.error("Error al cargar las propiedades:", error);
    return '';
  }
};
