import { useState } from "react";
import { PropertyCardProps } from "../utils/types";
import Button from "./Button";

const PropertyCard: React.FC<PropertyCardProps> = ({ title, imageSrc, type, description, status, price }) => {
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

    return (
        <div className="w-full flex justify-center items-center">
            <article className={`
                bg-white 
                rounded
                w-[400px] 
                h-[700px]
                text-surface
                shadow-md
                dark:bg-surface-dark dark:text-gray-800
                flex flex-col
                pb-3
                mx-3
                relative
            `}>
                <figure className="w-full  relative">
                    <div className="absolute bottom-2 right-0 flex">
                        <button
                            className={`text-white py-2 px-4 rounded transition duration-300 ${selectedButtons.heart ? 'text-red-500' : 'hover:text-red-500'
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
                    <a href={"/"} className="block w-full h-full">
                        <img
                            src={imageSrc[0]}
                            alt={title}
                            className="w-full h-full object-cover mx-auto"
                        />
                    </a>
                </figure>
                <div className="flex-grow flex flex-col p-4 sm:p-0"> {/* Permitir que este div crezca */}
                    <h3 className="text-center text-xl font-medium leading-tight">
                        <a href={"/"}>{title}</a>
                    </h3>
                    <h4>{type}</h4>
                    <div className="flex-grow p-5"> {/* Esta sección también puede crecer */}
                        <p className="pb-2 text-base text-gray-500 text-left">{description}</p>
                    </div>
                </div>
                <div className="pb-4">
                    <div className="px-4">
                        <p className="pb-2 text-left font-bold">Propiedad {status}</p>
                        <p className="pb-2 text-left text-xl text-green-700">{price}</p>
                    </div>
                    <Button to={"/"}>Ir a propiedad</Button>
                </div>
            </article>
        </div>
    );
};

export default PropertyCard;