import { useState } from "react";
import { PropertyCardProps } from "../utils/types";
import Button from "./Button";

const PropertyHorizontalCard: React.FC<PropertyCardProps> = ({ id, title, type, description, status, price }) => {
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

    const image = "https://placehold.co/70x20";

    const renderStatus = (status: string) => {
        switch (status) {
            case "en venta":
                return "En venta";
            case "en alquiler":
                return "En alquiler";
            case "reservada":
                return "Reservada";
            default:
                return "Estado desconocido";
        }
    };

    return (
        <div className="flex w-full justify-center items-start">
            <article className="bg-white rounded w-full shadow-md dark:bg-surface-dark dark:text-gray-800 flex">
                <figure className="w-2/5 relative">
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
                </figure>

                <div className="w-2/5 p-4 flex flex-col justify-between">
                    <h3 className="text-xl font-medium leading-tight">
                        <a href={"/"}>{title}</a>
                    </h3>
                    <p className="text-gray-500">{description}</p>
                </div>

                <div className="w-1/5 p-4 flex flex-col justify-between">
                    <div className="flex flex-col mb-4">
                        <div className="flex justify-between">
                            <span className="font-bold">Tipo:</span>
                            <span>{type}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Estado:</span>
                            <span>{renderStatus(status)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-bold">Precio:</span>
                            <span className="text-green-700">{price}</span>
                        </div>
                    </div>
                    {/* <Button to={"/"}>Ver propiedad </Button> */}
                    <Button to={`/propiedades/${id}`}>
                        Ver Propiedad
                    </Button>
                </div>
            </article>
        </div>
    );
};

export default PropertyHorizontalCard;