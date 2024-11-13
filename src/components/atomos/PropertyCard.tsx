// import { useState } from "react";
// import { PropertyCardProps, PropertyStatus } from "../../utils/types";
// import Button from "./Button";
// import { replaceStatus } from "../../utils/replaceStatus";

// const PropertyCard: React.FC<PropertyCardProps> = ({ id, title, imageSrc, type, description, status, price }) => {
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

//     const image = "https://placehold.co/300x300";

//     return (
//         <div className="w-full flex justify-center items-center m-3">
//             <article className={`
//                 bg-white 
//                 w-[400px] 
//                 h-[700px]
//                 text-surface
//                 shadow-md
//                 dark:bg-surface-dark dark:text-gray-800
//                 flex flex-col
//                 pb-3
//                 mx-3
//                 relative
//                 rounded-lg
//             `}>
//                 <figure className="w-full relative rounded-lg mb-3">
//                     <div className="absolute bottom-2 right-0 flex">
//                         <button
//                             className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart ? 'text-red-500' : 'hover:text-red-500 rounded-lg'
//                                 }`}
//                             onClick={() => toggleButton('heart')}
//                         >
//                             ♥
//                         </button>
//                         <button
//                             className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.dollar ? 'text-green-500' : 'hover:text-green-500'
//                                 }`}
//                             onClick={() => toggleButton('dollar')}
//                         >
//                             $
//                         </button>
//                     </div>
//                     {/* <span className="block w-full h-full rounded-t-lg"> */}
//                     <img
//                         // @ts-expect-error blabla bla
//                         src={imageSrc[0] ?? image}
//                         alt={title}
//                         // className="w-full h-full object-cover mx-auto"
//                         className="w-full h-full object-cover rounded-t-lg"
//                     />
//                     {/* </span> */}
//                 </figure>
//                 <div className="flex-grow flex flex-col p-4 sm:p-0"> {/* Permitir que este div crezca */}
//                     <h3 className="text-center text-xl font-medium leading-tight">
//                         <span className="capitalize" >{title}</span>
//                     </h3>
//                     <h4><span className="capitalize" >{type}</span></h4>
//                     <div className="flex-grow p-5"> {/* Esta sección también puede crecer */}
//                         <p className="pb-2 text-base text-gray-500 text-left">{description}</p>
//                     </div>
//                 </div>
//                 {/* <div className="pb-4">
//                     <div className="px-4 mb-4">
//                         <p className="pb-2 text-left font-bold">Propiedad <span className="capitalize text-red-500"> {state}</span></p>
//                         <p className="pb-2 text-left font-bold ">
//                             Precio:<span className="text-green-700 ml-1">U$S {Number(price).toLocaleString('de-DE')}
//                             </span>
//                         </p>
//                     </div>
//                     <Button to={`/propiedades/${id}`}>
//                         Ver Propiedad
//                     </Button>
//                 </div> */}
//                 <div className="pb-4 flex flex-col items-center">
//                     <div className="px-4 mb-4 text-center">
//                         <p className="pb-2 font-bold">
//                             Propiedad <span className="capitalize text-red-500">{replaceStatus(status)}</span>
//                         </p>
//                         <p className="pb-2 font-bold">
//                             Precio: <span className="text-green-700 ml-1">U$S {Number(price).toLocaleString('de-DE')}</span>
//                         </p>
//                     </div>
//                     <Button to={`/propiedades/${id}`}>
//                         Ver Propiedad
//                     </Button>
//                 </div>
//             </article>
//         </div>
//     );
// };

// export default PropertyCard;
import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
// import { PropertyCardProps, PropertyStatus } from "../../utils/types";
import Button from "./Button";
import { replaceStatus } from "../../utils/replaceStatus";

const PropertyCard: React.FC<PropertyCardProps> = ({ id, title, imageSrc, type, description, status, price }) => {
    const [selectedButtons, setSelectedButtons] = useState<{ heart: boolean; dollar: boolean }>({
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
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageSrc.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imageSrc.length - 1 ? 0 : prevIndex + 1));
    };

    const image = "https://placehold.co/300x300";

    return (
        <div className="w-full flex justify-center items-center m-3">
            <article className={`
                bg-white 
                w-[400px] 
                h-[700px]
                text-surface
                shadow-md
                dark:bg-surface-dark dark:text-gray-800
                flex flex-col
                pb-3
                mx-3
                relative
                rounded-lg
            `}>
                <figure className="w-full relative rounded-lg mb-3 group">
                    <img
                        src={imageSrc[currentImageIndex] ?? image}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
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
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart ? 'text-red-500' : 'hover:text-red-500 rounded-lg'
                                }`}
                            onClick={() => toggleButton('heart')}
                        >
                            ♥
                        </button>
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.dollar ? 'text-green-500' : 'hover:text-green-500'
                                }`}
                            onClick={() => toggleButton('dollar')}
                        >
                            $
                        </button>
                    </div>
                </figure>
                <div className="flex-grow flex flex-col p-4 sm:p-0">
                    <h3 className="text-center text-xl font-medium leading-tight">
                        <span className="capitalize">{title}</span>
                    </h3>
                    <h4><span className="capitalize">{type}</span></h4>
                    <div className="flex-grow p-5">
                        <p className="pb-2 text-base text-gray-500 text-left">{description}</p>
                    </div>
                </div>
                <div className="pb-4 flex flex-col items-center">
                    <div className="px-4 mb-4 text-center">
                        <p className="pb-2 font-bold">
                            Propiedad <span className="capitalize text-red-500">{replaceStatus(status)}</span>
                        </p>
                        <p className="pb-2 font-bold">
                            Precio: <span className="text-green-700 ml-1">U$S {Number(price).toLocaleString('de-DE')}</span>
                        </p>
                    </div>
                    <Button to={`/propiedades/${id}`}>
                        Ver Propiedad
                    </Button>
                </div>
            </article>
        </div>
    );
};

export default PropertyCard;