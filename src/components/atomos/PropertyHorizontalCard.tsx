import { useState } from "react";
import { PropertyCardProps } from "../../utils/types";
import Button from "./Button";

const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({ id, title, type, description, state, price, imageSrc }) => {
    const [selectedButtons, setSelectedButtons] = useState<{ heart: boolean; dollar: boolean }>({
        heart: false,
        dollar: false,
    });

    const toggleButton = (button: string) => {
        setSelectedButtons((prev) => ({
            ...prev,
            // @ts-ignore
            [button]: !prev[button],
        }));
    };

    // const image = "https://placehold.co/70x20";

    const renderstate = (state: string) => {
        switch (state) {
            case "en venta":
                return "En venta";
            case "en alquiler":
                return "En alquiler";
            case "reservada":
                return "Reservada";
            default:
                return "Estado no definido";
        }
    };
    return (
        <div className="flex w-full max-w-full justify-center items-start overflow-hidden">
            <article className="bg-white rounded w-full shadow-md dark:bg-surface-dark dark:text-gray-800 flex flex-col md:flex-row">
                {/* <figure className="w-full md:w-2/5 relative">
                    <div className="post_thumbnail" style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover', height: '100%', width: '100%' }}></div>
                    <div className="absolute bottom-2 right-0 flex">
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart ? 'text-red-500' : 'hover:text-red-500'}`}
                            onClick={() => toggleButton('heart')}
                        >
                            ♥
                        </button>
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.dollar ? 'text-green-500' : 'hover:text-green-500'}`}
                            onClick={() => toggleButton('dollar')}
                        >
                            $
                        </button>
                    </div>
                </figure> */}

                <figure className="w-full md:w-2/5 relative h-32 md:h-auto">
                    <div
                        className="post_thumbnail bg-center bg-cover h-full w-full"
                        style={{
                            //@ts-ignore
                            backgroundImage: `url('${imageSrc[0]}')`,
                        }}
                    ></div>
                    <div className="absolute bottom-2 right-0 flex">
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart ? 'text-red-500' : 'hover:text-red-500'}`}
                            onClick={() => toggleButton('heart')}
                        >
                            ♥
                        </button>
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.dollar ? 'text-green-500' : 'hover:text-green-500'}`}
                            onClick={() => toggleButton('dollar')}
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
                {/* <div className="w-full md:w-2/6 p-4 flex flex-col items-end">
                    <div className="flex flex-col mb-4 w-1/2">
                        <div className="flex justify-between">
                            <span className="font-bold">Tipo:</span>
                            <span className="capitalize text-right">{type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Estado:</span>
                            <span className="text-right">{renderstate(state)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Precio:</span>
                            <span className="text-green-700 text-right">U$S {Number(price).toLocaleString('de-DE')}</span>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <Button clase="text-center w-full" to={`/propiedades/${id}`}>
                            Ver Propiedad
                        </Button>
                    </div>
                </div> */}
                <div className="w-full md:w-3/6 p-4 flex flex-col md:items-end">
                    <div className="flex flex-col mb-4 w-full md:w-1/2">
                        <div className="flex justify-between md:justify-between">
                            <span className="font-bold">Tipo:</span>
                            <span className="capitalize text-right">{type}</span>
                        </div>
                        <div className="flex justify-between md:justify-between">
                            <span className="font-bold">Estado:</span>
                            <span className="text-right"> <span className="capitalize text-red-500 font-bold"> {renderstate(state)}</span> </span>
                        </div>
                        <div className="flex justify-between md:justify-between">
                            <span className="font-bold">Precio:</span>
                            <span className="text-green-700 text-right">U$S {Number(price).toLocaleString('de-DE')}</span>
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
}
//     return (
//         <div className="flex w-full justify-center items-start">
//             <article className="bg-white rounded w-full shadow-md dark:bg-surface-dark dark:text-gray-800 flex">
//                 <figure className="w-2/5 relative">
//                     <div className="post_thumbnail" style={{ backgroundImage: `url('${image}')`, backgroundSize: 'cover', height: '100%', width: '100%' }}></div>
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

//                 <div className="w-2/5 p-4 flex flex-col justify-between">
//                     <h3 className="text-xl font-medium leading-tight">
//                         <span >{title}</span>
//                     </h3>
//                     <p className="text-gray-500">{description}</p>
//                 </div>

//                 <div className="w-1/5 p-4 flex flex-col justify-between">
//                     <div className="flex flex-col mb-4">
//                         <div className="flex justify-between">
//                             <span className="font-bold">Tipo:</span>
//                             <span>{type}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-bold">Estado:</span>
//                             <span>{renderstate(state)}</span>
//                         </div>
//                         <div className="flex justify-between">
//                             <span className="font-bold">Precio:</span>
//                             <span className="text-green-700">{price}</span>
//                         </div>
//                     </div>
//                     <Button to={`/propiedades/${id}`}>
//                         Ver Propiedad
//                     </Button>
//                 </div>
//             </article>
//         </div>
//     );
// };

export default PropertyHorizontalCard;