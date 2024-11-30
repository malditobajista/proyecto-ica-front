import { PropertyCardProps } from "../../utils/types";
import axios from "axios";

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

  return await axios.post("http://localhost:3000/property/create", formData, {
    headers: {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnZXJhcmRvQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzI4NDI1MjUsImV4cCI6MTczMjkyODkyNX0.T2PeQoVH_BL5iC3sWEjoPWTwSOu5oN-NA4AxyNjG5E8",
      "Content-Type": "multipart/form-data"
    },
  });
};
