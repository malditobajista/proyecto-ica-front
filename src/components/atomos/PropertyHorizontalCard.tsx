import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import Button from "./Button";
import { replaceStatus } from "../../utils/replaceStatus";
import { FaBath, FaBed, FaRulerCombined, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import FavButton from "./HeartButton";

const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    type,
    address,
    neighborhood,
    description,
    status,
    price,
    rooms,
    bathrooms,
    area,
    imageSrc = [],
}) => {
    const [isFav, setIsFav] = useState(false);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleFavClick = () => {
        setIsFav((prev) => !prev);
    };
    const image = "https://placehold.co/300x300";

    return (
        // <div className="flex w-full max-w-full items-start overflow-hidden rounded-lg shadow-xl">
        <article className="bg-white rounded max-w-[1090px] shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row 
            min-h-[400px] md:min-h-[450px] lg:min-h-[36vh] w-full md:w-[700px] lg:w-[100%]" >
            {/* <article className="bg-white rounded max-w-[1090px] shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row md:max-h-[36vh]" > */}
            <figure className="w-full md:w-2/8 relative group  ">
                {/* <figure className="w-full  relative group  "> */}
                <div
                    // className="post_thumbnail bg-center bg-cover w-full rounded-l-lg aspect-square md:w-[350px] md:h-[350px]"
                    className="post_thumbnail bg-center bg-cover w-full aspect-square md:w-[350px] md:h-[350px] rounded-t-lg md:rounded-l-lg md:rounded-r-none"
                    style={{
                        backgroundImage: `url('${imageSrc[currentImageIndex] ?? image}')`,
                    }}
                >
                    {isLoading && imageSrc.length > 1 && (
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
                {imageSrc.length > 1 && (
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
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                    <FavButton
                        onClick={handleFavClick}
                        className={isFav ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                    />

                </div>
            </figure>

            <div className="w-full md:w-3/8 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-xl leading-tight font-bold">
                        <span>{title}</span>
                        <hr className="m-auto my-4 w-3/4 block md:hidden" />
                    </h3>
                    <p className="text-gray-500 text-m">{address}</p>
                    <hr className="m-auto w-3/4 block md:hidden" />
                </div>
                <div className="text-lg">
                    <h4 className="font-bold">Descripción</h4>
                    <p className="text-gray-500">{description}</p>
                    <hr className="m-auto mt-4 w-3/4 block md:hidden" />
                </div>
            </div>

            <div className="w-full md:w-3/8 p-4 flex flex-col items-start md:items-end">
                {/* <div className="w-full p-4 flex flex-col items-start md:items-end"> */}
                <div className="flex flex-col pb-4 mb-4 w-full space-y-3 flex-grow px-4">
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="font-bold">Tipo:</span>
                        <span className="capitalize text-right sm:text-left">{type}</span>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="font-bold">Estado:</span>
                        <span className="text-right sm:text-left">
                            <span className="capitalize text-red-500 font-bold">
                                {replaceStatus(status[0])}
                            </span>
                        </span>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="font-bold">Precio:</span>
                        <span className="text-green-700 text-right sm:text-left">
                            U$S {Number(price).toLocaleString("de-DE")}
                        </span>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <span className="font-bold">Barrio:</span>
                        <span className="text-cyan-700 font-bold text-right sm:text-left">
                            {neighborhood ? neighborhood : "No especificado"}
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
        // </div>
    );
};

export default PropertyHorizontalCard;