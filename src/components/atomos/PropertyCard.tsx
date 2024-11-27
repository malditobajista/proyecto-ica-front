import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import { replaceStatus } from "../../utils/replaceStatus";
import { Link } from "react-router-dom";
import FavouriteButton from "./HeartButton";
import { FaBath, FaBed, FaRulerCombined } from "react-icons/fa";

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  imageSrc,
  description,
  status,
  address,
  price,
  rooms,
  bathrooms,
  area,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const image = "https://placehold.co/300x300";

  return (
    <div className="w-full h-auto flex justify-center items-center">
<article className="bg-white w-full min-h-[500px] h-auto shadow-md rounded-lg overflow-hidden flex flex-col items-stretch">
{/* Imagen */}
        <figure className="relative w-full h-[300px] bg-gray-200">
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
              <div className="loader"></div>
            </div>
          )}
          <img
            src={imageSrc[currentImageIndex] ?? image}
            alt={title}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
          {/* Navegación de imágenes */}
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button
              className="bg-white bg-opacity-40 text-white p-2 rounded-full"
              onClick={handlePrevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              className="bg-white bg-opacity-40 text-white p-2 rounded-full"
              onClick={handleNextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          {/* Botón de favoritos */}
          <div className="absolute top-2 right-2">
            <FavouriteButton />
          </div>
        </figure>

        {/* Contenido */}
        <div className="p-4 flex-grow flex flex-col hover:text-secondary">
          <Link to={`/propiedades/${id}`} className="w-full hover:text-secondary">
            {/* Título */}
            <h3 className="text-left hover:text-secondary text-lg font-bold text-gray-800 truncate">Cabaña de Madera en la zona de Punta Rubia de dos dormitorios</h3>
            {/* Tipo de propiedad */}
            <p className="text-left text-m text-gray-500 capitalize">{address}</p>
            {/* Descripción */}
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
          

          {/* Detalles */}
          <div className="mt-4 flex justify-between text-sm text-gray-700">
            <div className="flex items-center space-x-1">
              <FaBed className="text-accent text-2xl" />
              <span>{rooms} Cuartos</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaBath className="text-accent text-2xl" />
              <span>{bathrooms} Baños</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaRulerCombined className="text-accent text-2xl" />
              <span>{area} m²</span>
            </div>
          </div>
          
          <div className="mt-4 text-left">
            {/* Texto superior */}
            <p className="text-sm font-bold text-gray-800">Propiedad {replaceStatus(status)}</p>
            {/* Precio destacado */}
            <p className="text-2xl font-bold text-teal-600 mt-1">
              U$S {Number(price).toLocaleString("de-DE")}
            </p>
          </div>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default PropertyCard;
