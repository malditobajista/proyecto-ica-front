export interface UserData {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;
  repeatPassword: string;
}

interface LatLng {
  lat: number;
  lng: number;
}
export interface PropertyCardProps {
  id: number;
  title: string;
  imageSrc?: string[];
  image?: string[];
  description: string;
  longDescription: string;
  status: PropertyStatus;
  price: number;
  // price: string;
  type: string;
  rooms?: number; // Opcional, dependiendo de si siempre se proporciona
  // rooms?: string | number; // Opcional, dependiendo de si siempre se proporciona
  bathrooms?: number; // Opcional, dependiendo de si siempre se proporciona
  // bathrooms?: string | number; // Opcional, dependiendo de si siempre se proporciona
  garages?: boolean; // Opcional, dependiendo de si siempre se proporciona
  // garages?: string | number; // Opcional, dependiendo de si siempre se proporciona
  piscina?: boolean; // Opcional, dependiendo de si siempre se proporciona
  ubicacion?: string; // Opcional, dependiendo de si siempre se proporciona
  area?: number;
  lotSize?: number;
  yearBuilt?: number;
  latitud?: number;
  longitud?: number;
  latLng?: LatLng | null;
}

export interface Property {
  id: number;
  title: string;
  imageSrc?: string[];
  description: string;
  longDescription: string;
  status: PropertyStatus;
  price: number;
  // price: string;
  type: string;
  rooms?: number;
  // rooms?: string | number;
  bathrooms?: number;
  // bathrooms?: string | number;
  garages?: boolean;
  // garages?: string | number;
  piscina?: boolean;
  ubicacion?: string;
  area?: number;
  lotSize?: number;
  yearBuilt?: number;
  latitud?: number;
  longitud?: number;
  latLng?: LatLng | null;
}

export interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  error?: string;
  maxLength?: number;
  rows?: number;
}

export interface RecaptchaProps {
  onError: (error: string) => void;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

export interface AgentProps {
  name: string;
  phone: string;
  oficina: string;
  whatsapp: string;
  email: string;
  propertiesListed: number;
  imageUrl?: string;
  profileUrl: string;
}

export enum PropertyStatus {
  ForSale = "for_sale",
  ForRent = "for_rent",
  Sold = "sold",
  Rented = "rented",
  UnderConstruction = "under_construction",
  Reserved = "reserved",
}

