import { PropertyCardProps } from "../utils/types";

// const propiedades: PropertyCardProps[] = [
//   ...Array.from({ length: 100 }, (_, i) => ({
//     id: i + 9,
//     title: `Propiedad ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
//     imageSrc: [
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${1}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${2}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${3}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${4}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${5}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${6}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${7}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${8}`,
//       `https://placehold.co/300x300/${Math.floor(Math.random() * 16777215)
//         .toString(16)
//         .padStart(6, "0")}/FFFFFF?text=Image+${9}`,
//     ],
//     description: `Descripción de la propiedad ${String.fromCharCode(
//       65 + (i % 26)
//     )}${i + 1}`,
//     longDescription: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis optio blanditiis natus pariatur, explicabo distinctio voluptas voluptate sit labore?  alias suscipit tempore molestias. Tempora a atque quae! Eos corporis quidem tempore repellat rem incidunt possimus similique exercitationem voluptatum nostrum. Alias, hic temporibus velit nulla deserunt reprehenderit officiis magni qui. Dicta rem porro beatae, odio in ratione repellendus, suscipit adipisci, exercitationem itaque enim optio. Iure, eos magni?.`,
//     state: i % 2 === 0 ? "en venta" : "en alquiler",
//     price: `${Math.floor(5000 + Math.random() * 145000)}`,
//     type: [
//       "casa",
//       "apartamento",
//       "oficina",
//       "comercio",
//       "almacen",
//       "terreno",
//       "otro",
//     ][i % 6],
//     ubicacion: [
//       "Cualquiera",
//       "Atlantica",
//       "La Paloma",
//       "- Anaconda",
//       "- Antoniópolis",
//       "- Arachania",
//       "- Barrio Country",
//       "- Barrio Parque",
//       "- Costa Azul",
//       "- La Aguada",
//       "- Playa Serena",
//       "La Pedrera",
//       "Oceania del Polonio",
//       "Pueblo Nuevo",
//       "Punta Rubia",
//       "Rocha",
//       "- Cerro Aspero Garzon",
//       "- Sierra de Rocha",
//       "San Antonio",
//       "San Sebastián de La Pedrera",
//       "Santa Isabel",
//       "No aplica",
//     ][i % 5],
//     banios: Math.floor(Math.random() * 3) + 1,
//     piscina: i % 3 === 0,
//     dormitorios: Math.floor(Math.random() * 4),
//     garages: Math.floor(Math.random() * 2),
//     area: Math.floor(30 + Math.random() * 120),
//     yearBuilt: 2000 + Math.floor(Math.random() * 23),
//     lotSize: Math.floor(50 + Math.random() * 200),
//   })),
// ];
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
    description: `Descripción de la propiedad ${String.fromCharCode(
      65 + (i % 26)
    )}${
      i + 1
    } Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt !`,
    longDescription: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis optio blanditiis natus pariatur, explicabo distinctio voluptas voluptate sit labore?  alias suscipit tempore molestias. Tempora a atque quae! Eos corporis quidem tempore repellat rem incidunt possimus similique exercitationem voluptatum nostrum. Alias, hic temporibus velit nulla deserunt reprehenderit officiis magni qui. Dicta rem porro beatae, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto incidunt reprehenderit quas, sequi obcaecati est aperiam ipsa alias, modi ducimus consequatur aut impedit repellendus hic molestias! Laboriosam accusamus distinctio error, quis quisquam voluptate, quia doloribus perferendis minima facere culpa aspernatur veniam rem unde omnis nihil blanditiis, quibusdam repellat consequuntur esse enim doloremque. Blanditiis exercitationem ipsa ex nisi harum voluptatibus ab officia, neque commodi beatae. Cum, voluptate qui magni omnis inventore voluptatibus praesentium earum reprehenderit, delectus quibusdam cupiditate voluptates possimus molestias dignissimos neque quos quidem sapiente aliquam laudantium itaque et! Temporibus, doloribus reiciendis. At culpa dolorem quam beatae nemo, sapiente rerum! odio in ratione repellendus, suscipit adipisci, exercitationem itaque enim optio. Iure, eos magni?.`,
    state: Math.random() < 0.5 ? "en venta" : "en alquiler", // Estado aleatorio
    price: `${Math.floor(5000 + Math.random() * 145000)}`,
    type: [
      "casa",
      "apartamento",
      "oficina",
      "comercio",
      "almacen",
      "terreno",
      "otro",
    ][i % 7], // Asegúrate de que el índice no exceda el tamaño del array
    ubicacion: [
      "Cualquiera",
      "Atlantica",
      "La Paloma",
      "- Anaconda",
      "- Antoniópolis",
      "- Arachania",
      "- Barrio Country",
      "- Barrio Parque",
      "- Costa Azul",
      "- La Aguada",
      "- Playa Serena",
      "La Pedrera",
      "Oceania del Polonio",
      "Pueblo Nuevo",
      "Punta Rubia",
      "Rocha",
      "- Cerro Aspero Garzon",
      "- Sierra de Rocha",
      "San Antonio",
      "San Sebastián de La Pedrera",
      "Santa Isabel",
      "No aplica",
    ][i % 21], // Asegúrate de que el índice no exceda el tamaño del array
    banios: Math.floor(Math.random() * 3) + 1,
    piscina: Math.random() < 0.33, // Piscina aleatoria
    dormitorios: Math.floor(Math.random() * 4),
    garages: Math.floor(Math.random() * 2),
    area: Math.floor(30 + Math.random() * 120),
    yearBuilt: 2000 + Math.floor(Math.random() * 23),
    lotSize: Math.floor(50 + Math.random() * 200),
  })),
];
export default propiedades;

