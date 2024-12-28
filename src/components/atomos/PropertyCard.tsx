import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import { replaceStatus } from "../../utils/replaceStatus";
import { Link } from "react-router-dom";
import FavButton from "./HeartButton";
import { FaBath, FaBed, FaRulerCombined, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [isFav, setIsFav] = useState(false);

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
  const handleFavClick = () => {
    setIsFav((prev) => !prev);
  };
  const image = "https://placehold.co/300x300";

  return (
    <div className="w-full h-auto flex justify-center items-center ">
      <article className="bg-white w-full min-h-[75vh] h-auto shadow-md rounded-lg overflow-hidden flex flex-col items-stretch">
        {/* Imagen */}
        <figure className="relative w-full h-[300px] bg-gray-200 overflow-hidden rounded-t-lg group">
          {isLoading && imageSrc.length > 1 && (
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
          {imageSrc.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-50"
                onClick={handlePrevImage}
              >
                <FaChevronLeft className="w-3 h-3 text-black" />
              </button>
              <button
                className="bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-50"
                onClick={handleNextImage}
              >
                <FaChevronRight className="w-3 h-3 text-black" />
              </button>
            </div>
          )}
          {/* Botón de favoritos */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FavButton
              onClick={handleFavClick}
              className={isFav ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
            />
          </div>
        </figure>

        {/* Contenido */}
        <div className="  flex-grow flex flex-col  hover:bg-gray-200   transition-font duration-300 rounded-lg ">
          <Link to={`/propiedades/${id}`} className="w-full transition-bg duration-300 p-4 ">
            <div className="pb-8 h-[25vh]">
              {/* Título */}
              <h3 className="text-left pb-4  text-lg font-bold text-gray-800 truncate hover:font-extrabold hover:text-green-600  transition-font duration-300">{title}</h3>
              {/* Tipo de propiedad */}
              <p className="pb-3 text-justify text-sm text-gray-500 capitalize   hover:text-green-600  transition-font duration-300">{address}</p>
              {/* Descripción */}
              <p className="pb-4 text-justify text-sm text-gray-600 hover:text-green-600 line-clamp-2">{description}</p>
            </div>

            <div className="px-4 h-[10vh]">
              {/* Detalles */}
              <div className="mb-6 flex justify-between text-sm text-gray-700">
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
            </div>

            <div className="flex justify-around  hover:font-extrabold transition-font duration-300">
              {/* Texto superior */}
              {/* status */}
              <div className="flex flex-wrap bg-blue-100 capitalize pt-2 py-2 text-blue-800 text-xs font-semibold mr-2 px-2.5  rounded">
                {/* {status.map((s) => (
                  <span
                    key={s}
                  >
                    {replaceStatus(s)}
                  </span>
                ))} */}
                {status.map((s, index) => (
                  <span key={s}>
                    {index > 0 && " -"}
                    {replaceStatus(s)}
                  </span>
                ))}
              </div>{" "}              {/* Precio destacado */}
              <span className="text-2xl font-bold text-teal-600 hover:font-extrabold transition-font duration-300">
                U$S {Number(price).toLocaleString("de-DE")}
              </span>
            </div>

          </Link>
        </div>
      </article>
    </div>
  );
};

export default PropertyCard;