// import { useState } from "react";
// import { PropertyCardProps } from "../../utils/types";
// // import { PropertyCardProps, PropertyStatus } from "../../utils/types";
// import Button from "./Button";
// import { replaceStatus } from "../../utils/replaceStatus";

// const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({ id, title, type, description, status, price, imageSrc }) => {
//     const [selectedButtons, setSelectedButtons] = useState<{ heart: boolean; dollar: boolean }>({
//         heart: false,
//         dollar: false,
//     });

//     const toggleButton = (button: string) => {
//         setSelectedButtons((prev) => ({
//             ...prev,
//             // @ts-expect-error blabla bla
//             [button]: !prev[button],
//         }));
//     };

//     return (
//         <div className="flex w-full max-w-full justify-center items-start overflow-hidden rounded-lg">
//             <article className="bg-white rounded w-full shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row">
//                 <figure className="w-full md:w-2/5 relative h-32 md:h-auto">
//                     <div
//                         className="post_thumbnail bg-center bg-cover h-full w-full rounded-l-lg"
//                         style={{
//                             backgroundImage: `url('${imageSrc[0]}')`,
//                         }}
//                     ></div>
//                     <div className="absolute bottom-2 right-0 flex">
//                         <button
//                             className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart ? 'text-red-500' : 'hover:text-red-500'}`}
//                             onClick={() => toggleButton('heart')}
//                         >
//                             ♥
//                         </button>
//                         <button
//                             className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.dollar ? 'text-green-500' : 'hover:text-green-500'}`}
//                             onClick={() => toggleButton('dollar')}
//                         >
//                             $
//                         </button>
//                     </div>
//                 </figure>

//                 <div className="w-full md:w-2/6 p-4 flex flex-col justify-between">
//                     <h3 className="text-xl font-medium leading-tight">
//                         <span>{title}</span>
//                     </h3>
//                     <p className="text-gray-500">{description}</p>
//                 </div>

//                 <div className="w-full md:w-3/6 p-4 flex flex-col md:items-end">
//                     <div className="flex flex-col mb-4 w-full md:w-1/2">
//                         <div className="flex justify-between md:justify-between">
//                             <span className="font-bold">Tipo:</span>
//                             <span className="capitalize text-right">{type}</span>
//                         </div>
//                         <div className="flex justify-between md:justify-between">
//                             <span className="font-bold">Estado:</span>
//                             <span className="text-right">
//                                 <span className="capitalize text-red-500 font-bold"> {replaceStatus(status)}</span>
//                             </span>
//                         </div>
//                         <div className="flex justify-between md:justify-between">
//                             <span className="font-bold">Precio:</span>
//                             <span className="text-green-700 text-right">U$S {Number(price).toLocaleString('de-DE')}</span>
//                         </div>
//                     </div>
//                     <div className="w-full md:w-1/2">
//                         <Button clase="text-center w-full" to={`/propiedades/${id}`}>
//                             Ver Propiedad
//                         </Button>
//                     </div>
//                 </div>
//             </article>
//         </div>
//     );
// };

// export default PropertyHorizontalCard;
import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import Button from "./Button";
import { replaceStatus } from "../../utils/replaceStatus";

const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    type,
    description,
    status,
    price,
    imageSrc = [], // Valor predeterminado como un array vacío
}) => {
    const [selectedButtons, setSelectedButtons] = useState<{
        heart: boolean;
        dollar: boolean;
    }>({
        heart: false,
        dollar: false,
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const toggleButton = (button: string) => {
        setSelectedButtons((prev) => ({
            ...prev,
            // @ts-expect-error blabla bla
            [button]: !prev[button],
        }));
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1
        );
    };

    const image = "https://placehold.co/300x300";

    return (
        <div className="flex w-full max-w-full justify-center items-start overflow-hidden rounded-lg">
            <article className="bg-white rounded w-full shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row">
                <figure className="w-full md:w-2/5 relative h-32 md:h-auto group">
                    <div
                        className="post_thumbnail bg-center bg-cover h-full w-full rounded-l-lg"
                        style={{
                            backgroundImage: `url('${imageSrc[currentImageIndex] ?? image}')`,
                        }}
                    ></div>
                    <div className="absolute inset-0 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            className="bg-black bg-opacity-20 hover:bg-opacity-50 text-white p-2 rounded-full ml-2"
                            onClick={handlePrevImage}
                        >
                            &lt;
                        </button>
                        <button
                            className="bg-black bg-opacity-20 hover:bg-opacity-50 text-white p-2 rounded-full mr-2"
                            onClick={handleNextImage}
                        >
                            &gt;
                        </button>
                    </div>
                    <div className="absolute bottom-2 right-0 flex">
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart
                                ? "text-red-500"
                                : "hover:text-red-500"
                                }`}
                            onClick={() => toggleButton("heart")}
                        >
                            ♥
                        </button>
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.dollar
                                ? "text-green-500"
                                : "hover:text-green-500"
                                }`}
                            onClick={() => toggleButton("dollar")}
                        >
                            $
                        </button>
                    </div>
                </figure>

                <div className="w-full md:w-2/6 p-4 flex flex-col justify-between">
                    <h3 className="text-xl font-medium leading-tight">
                        <span>{title}</span>
                    </h3>
                    <p className="text-gray-500">{description}</p>
                </div>

                <div className="w-full md:w-3/6 p-4 flex flex-col md:items-end">
                    <div className="flex flex-col mb-4 w-full md:w-1/2">
                        <div className="flex justify-between md:justify-between">
                            <span className="font-bold">Tipo:</span>
                            <span className="capitalize text-right">{type}</span>
                        </div>
                        <div className="flex justify-between md:justify-between">
                            <span className="font-bold">Estado:</span>
                            <span className="text-right">
                                <span className="capitalize text-red-500 font-bold">
                                    {replaceStatus(status)}
                                </span>
                            </span>
                        </div>
                        <div className="flex justify-between md:justify-between">
                            <span className="font-bold">Precio:</span>
                            <span className="text-green-700 text-right">
                                U$S {Number(price).toLocaleString("de-DE")}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
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