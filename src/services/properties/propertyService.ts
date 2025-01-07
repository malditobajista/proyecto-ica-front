import { Home, Property, PropertyCardProps } from "../../utils/types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const createProperty = async (propertyData: Omit<PropertyCardProps, 'id'>, files: File[]) => {
  const formData = new FormData();

  formData.append("property", JSON.stringify(propertyData));

  files.forEach((file) => formData.append("files", file));

  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  const res = await fetch(`${BASE_URL}/property/create`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!res.ok) throw new Error('Error creating property');
  return await res.json();
};


export const fetchHomeClient = async (): Promise<Home> => {
  try {
    console.log("fetchHomeClient");
    const res = await fetch(`${BASE_URL}/property/home`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return {rent: [], sale: [], pinned: []};
  }
}

export const fetchCreated = async (): Promise<Property[]> => {
  try {
    const res = await fetch(`${BASE_URL}/property/createdProperties`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
};

export const fetchFavourites = async (): Promise<Property[]> => {
  try {
    const res = await fetch(`${BASE_URL}/favorites/get`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return [];
  }
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

export const addFavourite = async (id: number): Promise<boolean> => {
  try {
    await fetch(`${BASE_URL}/favorites/add?propertyId=${id}`, {
      method: 'POST',
      credentials: 'include',
    });
    return true;
  }catch(error){
    console.error("Error al cargar las propiedades:", error);
    return false;
  }
};
