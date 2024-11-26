import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import Button from "./Button";
import { replaceStatus } from "../../utils/replaceStatus";
import { Link } from "react-router-dom";
import FavouriteButton from "./HeartButton";

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  imageSrc,
  type,
  description,
  status,
  price,
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
    <div className="w-full flex justify-center items-center ">
      <article
        className={`
                bg-white 
                w-[400px] 
                h-[650px]
                text-surface
                shadow-md
                dark:bg-surface-dark dark:text-gray-800
                flex flex-col
                mx-3
                relative
                rounded-lg
            `}
      >
        <figure className="w-full relative rounded-lg mb-4 group">
          <div className="relative w-full h-full">
            {isLoading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                <div className="loader"></div>
              </div>
            )}
            <img
              src={imageSrc[currentImageIndex] ?? image}
              alt={title}
              className="w-full h-full object-cover rounded-t-lg transition duration-300 group-hover:opacity-80 peer-hover:opacity-100 peer-hover:bg-green-500"
              onLoad={handleImageLoad}
            />
          </div>
          <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="bg-white bg-opacity-40 hover:bg-opacity-80 text-white p-2 rounded-full ml-2"
              onClick={handlePrevImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="grey"
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
            <Button
              to={`/propiedades/${id}`}
              clase="bg-primary text-white bg-opacity-30 font-bold hover:bg-gray-200 hover:text-black peer hover:font-bold"
            >
              Ver Propiedad
            </Button>

            <button
              className="bg-white bg-opacity-40 hover:bg-opacity-80 text-white p-2 rounded-full mr-2"
              onClick={handleNextImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="grey"
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
          <div className="absolute bottom-2 right-1 flex">
          <FavouriteButton />
          </div>
        </figure>

        <Link to={`/propiedades/${id}`} className="w-full">
          <div className="flex-grow flex flex-col p-4 sm:p-0">
            <h3 className="text-center text-xl font-medium leading-tight">
              <span className="capitalize">{title}</span>
            </h3>
            <h4>
              <span className="capitalize">{type}</span>
            </h4>
            <div className="flex-grow p-5">
              <p className="pb-2 text-base text-gray-500 text-left">
                {description}
              </p>
            </div>
          </div>
          <div className="pb-4 flex flex-col items-center">
            <div className="px-4 mb-4 text-center">
              <p className="pb-2 font-bold">
                Propiedad{" "}
                <span className="capitalize text-red-500">
                  {replaceStatus(status)}
                </span>
              </p>
              <p className="pb-2 font-bold">
                Precio:{" "}
                <span className="text-green-700 ml-1">
                  U$S {Number(price).toLocaleString("de-DE")}
                </span>
              </p>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default PropertyCard;
