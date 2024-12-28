import { PropertyCardProps, PropertyStatus } from "../utils/types";
import { Barrios } from "./barrios";
import { Types } from "./types";

// Constructor para generar coordenadas geográficas
interface LatLng {
  lat: number;
  lng: number;
}
const generateGeoCoordinates = (count: number): LatLng[] => {
  const baseLat = -34.757; // Latitud base para Costa Azul
  const baseLng = -54.358; // Longitud base para Costa Azul
  const coordinates: LatLng[] = [];

  for (let i = 0; i < count; i++) {
    // Generar variaciones aleatorias en latitud y longitud
    const latVariation = (Math.random() - 0.5) * 0.01; // Variación de ±0.01 grados
    const lngVariation = (Math.random() - 0.5) * 0.01; // Variación de ±0.01 grados
    coordinates.push({
      lat: baseLat + latVariation,
      lng: baseLng + lngVariation,
    });
  }

  return coordinates;
};
const geoCoordinatesList: LatLng[] = generateGeoCoordinates(100);

const propiedades: PropertyCardProps[] = [
  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 9,
    title: `Propiedad ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    imageSrc: Array.from(
      { length: 9 },
      (_, j) =>
        `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}/FFFFFF?text=Image+${j + 1}`
    ),
    address: `Dirección de la propiedad ${String.fromCharCode(65 + (i % 26))}${
      i + 1
    } asdasddas asdasdads asdads`,
    description: `Descripción de la propiedad ${String.fromCharCode(
      65 + (i % 26)
    )}${
      i + 1
    } Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt !`,
    longDescription: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis optio blanditiis natus pariatur, explicabo distinctio voluptas voluptate sit labore?  alias suscipit tempore molestias. Tempora a atque quae! Eos corporis quidem tempore repellat rem incidunt possimus similique exercitationem voluptatum nostrum. Alias, hic temporibus velit nulla deserunt reprehenderit officiis magni qui. Dicta rem porro beatae, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt reprehenderit quas, sequi obcaecati est aperiam ipsa alias, modi ducimus consequatur aut impedit repellendus hic molestias! Laboriosam accusamus distinctio error, quis quisquam voluptate, quia doloribus perferendis minima facere culpa aspernatur veniam rem unde omnis nihil blanditiis, quibusdam repellat consequuntur esse enim doloremque. Blanditiis exercitationem ipsa ex nisi harum voluptatibus ab officia, neque commodi beatae. Cum, voluptate qui magni omnis inventore voluptatibus praesentium earum reprehenderit, delectus quibusdam cupiditate voluptates possimus molestias dignissimos neque quos quidem sapiente aliquam laudantium itaque et! Temporibus, doloribus reiciendis. At culpa dolorem quam beatae nemo, sapiente rerum! odio in ratione repellendus, suscipit adipisci, exercitationem itaque enim optio. Iure, eos magni?.`,
    status:[
      Object.values(PropertyStatus)[
        Math.floor(Math.random() * Object.values(PropertyStatus).length)
      ],       Object.values(PropertyStatus)[
        Math.floor(Math.random() * Object.values(PropertyStatus).length)
      ]],
    price: Math.floor(5000 + Math.random() * 145000),
    type: Types[i % Types.length].label,
    neighborhood: Barrios[i % Barrios.length].label,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    pool: Math.random() < 0.33,
    rooms: Math.floor(Math.random() * 4),
    garages: Math.random() < 0.5,
    area: Math.floor(30 + Math.random() * 120),
    contribucion: String(Math.floor(30 + Math.random() * 50000)),
    yearBuilt: String(2000 + Math.floor(Math.random() * 23)),
    lotSize: Math.floor(50 + Math.random() * 200),
    pinned: i < 10,
    geoCoordinates: geoCoordinatesList[i], // Asignar coordenadas a las propiedades
  })),
];
export default propiedades;

