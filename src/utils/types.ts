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
  status: string;
  price: string;
  type: string;
  dormitorios?: string | number; // Opcional, dependiendo de si siempre se proporciona
  banios?: string | number; // Opcional, dependiendo de si siempre se proporciona
  garages?: string | number; // Opcional, dependiendo de si siempre se proporciona
  piscina?: boolean; // Opcional, dependiendo de si siempre se proporciona
  ubicacion?: string; // Opcional, dependiendo de si siempre se proporciona
  area?: number;
  yearBuilt?: number;
  lotSize?: number;
  latitud?: number;
  longitud?: number;
  latLng?: LatLng | null;
}

export interface Property {
  id: number;
  title: string;
  imageSrc?: string[];
  description: string;
  status: string;
  price: string;
  type: string;
  dormitorios?: string | number;
  banios?: string | number;
  garages?: string | number;
  piscina?: boolean;
  ubicacion?: string;
  area?: number;
  yearBuilt?: number;
  lotSize?: number;
  latitud?: number;
  longitud?: number;
  latLng?: LatLng | null;
}

