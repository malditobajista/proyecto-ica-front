export interface UserData {
  user: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    repeatPassword?: string;
  };
}
// export interface UserData {
//   id?: number;
//   nombre: string;
//   apellido: string;
//   email: string;
//   telefono: string;
//   password: string;
//   repeatPassword: string;
// }

interface LatLng {
  lat: number;
  lng: number;
}
export interface PropertyCardProps {
  id: number;
  title: string;
  imageSrc: string[];
  image?: string[];
  address: string;
  description: string;
  longDescription: string;
  status: PropertyStatus;
  price: number;
  type: string;
  rooms?: number;
  bathrooms?: number;
  garages?: boolean;
  piscina?: boolean;
  neighborhood?: string;
  area?: number;
  lotSize?: number;
  yearBuilt?: string;
  latitud?: number;
  longitud?: number;
  geoCoordinates?: LatLng | null;
  contribucion?: string;
  pinned?: boolean;
  approved?: boolean;
}

export interface Property {
  id: number;
  title: string;
  imageSrc: string[];
  address: string;
  description: string;
  longDescription: string;
  status: PropertyStatus;
  price: number;
  type: string;
  rooms?: number;
  bathrooms?: number;
  garages?: boolean;
  piscina?: boolean;
  neighborhood?: string;
  area?: number;
  lotSize?: number;
  yearBuilt?: string;
  latitud?: number;
  longitud?: number;
  geoCoordinates?: LatLng | null;
  contribucion?: string;
  pinned?: boolean;
  approved?: boolean;
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

