import { useState } from "react";
import { PropertyCardProps } from "../utils/types";
import Button from "./Button";

const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({ title, imageSrc, type, description, status, price }) => {
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
        <div className="flex w-full justify-center items-center">
            <article className={`
                bg-white 
                rounded
                w-full 
                h-[200px] 
                text-surface
                shadow-md
                dark:bg-surface-dark dark:text-gray-800
                flex
                relative
            `}>
                <figure className="w-1/3 relative">
                    <a href={"/"}>
                        <div className="post_thumbnail" style={{ backgroundImage: `url('${imageSrc[0]}')`, backgroundSize: 'cover', height: '100%' }}></div>
                    </a>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button to={"/"}>Ver propiedad</Button>
                    </div>
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

                <div className="w-2/3 flex flex-col justify-between p-4">
                    <h3 className="text-xl font-medium leading-tight">
                        <a href={"/"}>{title}</a>
                    </h3>
                    <p className="text-gray-500">{description}</p>

                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <span className="font-bold">Tipo:</span>
                            <span>{type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Estado:</span>
                            <span>{status}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Precio:</span>
                            <span className="text-green-700">{price}</span>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PropertyHorizontalCard;