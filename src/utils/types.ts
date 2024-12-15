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

export interface LatLng {
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
  pool?: boolean;
  neighborhood?: string;
  area?: number;
  lotSize?: number;
  yearBuilt?: number | string;
  geoCoordinates?: LatLng | null;
  contribution?: number;
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
  type: PropertyTypes;
  rooms?: number;
  bathrooms?: number;
  garages?: boolean;
  pool?: boolean;
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
  oficina: string;
  whatsapp: string;
  email: string;
  propertiesListed: number;
  imageUrl?: string;
  // profileUrl: string;
}

export enum PropertyTypes {
  HOUSE = "house",
  APARTMENT = "apartment",
  LAND = "land",
  OFFICE = "office",
  STORE = "store",
  OTHER = "other",
}

export enum PropertyStatus {
  ForSale = "for_sale",
  ForRent = "for_rent",
  Sold = "sold",
  Rented = "rented",
  UnderConstruction = "under_construction",
  Reserved = "reserved",
}

export type Filters = {
  filterTypes: string[];
  filterStatus: string[];
  filterHood: string[];
  filterRooms: number[] | null;
  filterGarages: boolean;
  filterPool: boolean;
  sortOrder: "asc" | "desc" | null;
};

export type FiltersPanelProps = {
  initialFilters: Filters;
  onFiltersChange: (updatedFilters: Filters) => void;
};

