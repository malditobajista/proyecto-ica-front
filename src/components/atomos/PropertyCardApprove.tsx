import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBath, FaBed, FaRulerCombined, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { replaceStatus } from "../../utils/replaceStatus";
import { Property } from "../../utils/types";
import { approveProperty, deleteProperty } from "../../services/properties/propertyService";

interface ApprovePropertiesPageProps {
  property: Property;
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
}

const PropertyCardApproved: React.FC<ApprovePropertiesPageProps> = ({
  property,
  setProperties,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async (propertyId: number) => {
    try {
       await approveProperty(propertyId);
      setProperties((prev) => prev.filter((property) => property.id !== propertyId));
    } catch (err) {
      console.error("Error al aprobar la propiedad", err);
      alert("No se pudo aprobar la propiedad");
    }
  };

  const handleReject = async (propertyId: number) => {
    try {
      await deleteProperty(propertyId);
      setProperties((prev) => prev.filter((property) => property.id !== propertyId));
    } catch (err) {
      console.error("Error al rechazar la propiedad", err);
      alert("No se pudo rechazar la propiedad");
    }
  };

  const handlePrevImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.imageSrc.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setIsLoading(true);
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.imageSrc.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const imagePlaceholder = "https://placehold.co/300x300";

  return (
    <div className="w-full h-auto flex justify-center items-center">
      <article className="bg-white w-full min-h-[300px] h-auto shadow-md rounded-lg overflow-hidden flex flex-col items-stretch">
        <figure className="relative w-full h-[22rem] bg-gray-200 overflow-hidden rounded-t-lg group">
          {isLoading && property.imageSrc.length > 1 && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
              <div className="loader"></div>
            </div>
          )}
          <img
            src={property.imageSrc[currentImageIndex] ?? imagePlaceholder}
            alt={property.title}
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
          />
          {property.imageSrc.length > 1 && (
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
        </figure>

        <div className="flex-grow flex flex-col hover:bg-gray-200 transition-font duration-300">
          <Link to={`/properties/${property.id}`} className="w-full transition-bg duration-300 p-4">
            <h3 className="text-left text-lg font-bold text-gray-800 truncate hover:font-extrabold hover:text-green-600 transition-font duration-300">
              {property.title}
            </h3>
            <p className="pb-3 text-justify text-sm text-gray-500 capitalize hover:text-green-600 transition-font duration-300">
              {property.address}
            </p>
            <p className="pb-4 text-left text-sm text-gray-600 hover:text-green-600">
              {property.description}
            </p>
          </Link>
        </div>
        <div className="px-4 h-[10vh]">
              {/* Detalles */}
              <div className="mb-6 flex justify-between text-sm text-gray-700">
                <div className="flex items-center space-x-1">
                  <FaBed className="text-accent text-2xl" />
                  <span>{property.rooms} Cuartos</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaBath className="text-accent text-2xl" />
                  <span>{property.bathrooms} Baños</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaRulerCombined className="text-accent text-2xl" />
                  <span>{property.area} m²</span>
                </div>
              </div>
            </div>

            <div className="flex justify-around  hover:font-extrabold transition-font duration-300">
              {/* Texto superior */}
              {/* status */}
              <div className="flex flex-wrap bg-blue-100 capitalize pt-2 py-2 text-blue-800 text-xs font-semibold mr-2 px-2.5  rounded">
                {property.status.map((s, index) => (
                  <span key={s}>
                    {index > 0 && " - "}
                    {replaceStatus(s)}
                  </span>
                ))}
              </div>{" "}              
              {/* Precio destacado */}
              <span className="text-2xl font-bold text-teal-600 hover:font-extrabold transition-font duration-300">
                U$S {Number(property.price).toLocaleString("de-DE")}
              </span>
            </div>

        <div className="mt-4 flex justify-between p-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={() => handleApprove(property.id)}
          >
            Aprobar
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={() => handleReject(property.id)}
          >
            Rechazar
          </button>
        </div>
      </article>
    </div>
  );
};

export default PropertyCardApproved;
