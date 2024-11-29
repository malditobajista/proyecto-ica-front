import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import Button from "./Button";
import { replaceStatus } from "../../utils/replaceStatus";
import { FaBath, FaBed, FaRulerCombined, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    type,
    address,
    description,
    status,
    price,
    rooms,
    bathrooms,
    area,
    imageSrc = [],
}) => {
    const [selectedButtons, setSelectedButtons] = useState({
        heart: false,
        dollar: false,
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const toggleButton = (button: string) => {
        setSelectedButtons((prev) => ({
            ...prev,
            // @ts-expect-error blabla bla
            [button]: !prev[button],
        }));
    };

    const handlePrevImage = () => {
        setIsLoading(true);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
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
        <div className="flex w-full max-w-full justify-center items-start overflow-hidden rounded-lg">
            <article className="bg-white rounded max-w-[1090px] shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row">
                <figure className="w-full md:w-2/8 relative group  ">
                    <div
                        className="post_thumbnail bg-center bg-cover w-full rounded-l-lg aspect-square md:w-[350px] md:h-[350px]"
                        style={{
                            backgroundImage: `url('${imageSrc[currentImageIndex] ?? image}')`,
                        }}
                    >
                        {isLoading && (
                            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50">
                                <div className="loader"></div>
                            </div>
                        )}
                        <img
                            src={imageSrc[currentImageIndex] ?? image}
                            alt="Property"
                            className="hidden"
                            onLoad={handleImageLoad}
                        />
                    </div>
                    <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            className="bg-black bg-opacity-20 hover:bg-opacity-50 text-white p-2 rounded-full ml-2"
                            onClick={handlePrevImage}
                        >
                            <FaChevronLeft className="w-3 h-3 text-black  " />
                        </button>
                        <button
                            className="bg-black bg-opacity-20 hover:bg-opacity-50 text-white p-2 rounded-full mr-2"
                            onClick={handleNextImage}
                        >
                            <FaChevronRight className="w-3 h-3 text-black" />
                        </button>
                    </div>
                    <div className="absolute bottom-2 right-2 flex space-x-2">
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart
                                ? "text-red-500"
                                : "hover:text-red-500"
                                }`}
                            onClick={() => toggleButton("heart")}
                        >
                            ♥
                        </button>

                    </div>
                </figure>

                {/* Contenido */}
                <div className="w-full md:w-3/8 p-4 flex flex-col justify-between">
                    <h3 className="text-xl leading-tight font-bold">
                        <span>{title}</span>
                        <hr className="m-auto my-4 w-3/4 block md:hidden" />
                    </h3>
                    <div className="text-lg">
                        <h4 className="font-bold">Dirección</h4>
                        <p className="text-gray-500">{address}</p>
                        <hr className="m-auto mt-4 w-3/4 block md:hidden" />
                    </div>
                    <div className="text-lg">
                        <h4 className="font-bold">Descripción</h4>
                        <p className="text-gray-500">{description}</p>
                        <hr className="m-auto mt-4 w-3/4 block md:hidden" />
                    </div>
                </div>

                <div className="w-full md:w-3/8 p-4 flex flex-col items-start md:items-end">
                    <div className="flex flex-col mb-4 w-full space-y-3 flex-grow">
                        <div className="flex flex-col sm:flex-row justify-between w-full">
                            <span className="font-bold">Tipo:</span>
                            <span className="capitalize text-right sm:text-left w-full sm:w-auto">{type}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between w-full">
                            <span className="font-bold">Estado:</span>
                            <span className="text-right sm:text-left w-full sm:w-auto">
                                <span className="capitalize text-red-500 font-bold">
                                    {replaceStatus(status)}
                                </span>
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between w-full">
                            <span className="font-bold">Precio:</span>
                            <span className="text-green-700 text-right sm:text-left w-full sm:w-auto">
                                U$S {Number(price).toLocaleString("de-DE")}
                            </span>
                        </div>
                    </div>
                    <div className="pb-3 w-full">
                        {/* Detalles */}
                        <div className="mb-6 flex justify-around items-center text-sm text-gray-700">
                            <div className="flex flex-col items-center space-x-0 space-y-1">
                                <FaBed className="text-accent text-2xl" />
                                <span>{rooms} Cuartos</span>
                            </div>
                            <div className="flex flex-col items-center space-x-0 space-y-1">
                                <FaBath className="text-accent text-2xl" />
                                <span>{bathrooms} Baños</span>
                            </div>
                            <div className="flex flex-col items-center space-x-0 space-y-1">
                                <FaRulerCombined className="text-accent text-2xl" />
                                <span>{area} m²</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        <Button clase="text-center w-full" to={`/propiedades/${id}`}>
                            Ver Propiedad
                        </Button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PropertyHorizontalCard;