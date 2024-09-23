import { PropertyCardProps } from "../utils/types";
import Button from "./Button";

const cardSize = window.innerWidth < 768 ? "50%" : "300px";
console.log(cardSize)

const PropertyCard: React.FC<PropertyCardProps> = ({ title, imageSrc, type, description, status, price }) => {
    return (
        <div className="w-full flex justify-center items-center">
            <article className={`
                bg-white 
                rounded
                lg:w-[${cardSize}] 
                sm:w-[${cardSize}]
                text-surface
                shadow-md // Aquí se añade la sombra mediana
                dark:bg-surface-dark dark:text-gray-800
                pb-3
                mx-3
                relative
            `}>
                <figure className="w-full pb-2 relative">
                    <div className="absolute bottom-2 right-0 p-2 flex space-x-2">
                        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 hover:text-white transition duration-300">♥</button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 hover:text-white transition duration-300">$</button>
                    </div>
                    <a href={"/"} className="block w-full h-full">
                        <img
                            src={imageSrc[0]}
                            alt={title}
                            className="w-full h-48 object-cover mx-auto sm:h-auto"
                        />
                    </a>
                </figure>
                <div className="p-4 sm:p-0">
                    <h3 className="text-center text-xl font-medium leading-tight">
                        <a href={"/"}>{title}</a>
                    </h3>
                    <h4>{type}</h4>
                    <div className="p-5">
                        <p className="pb-2 text-base text-gray-500 text-left">{description}</p>
                        <p className="pb-2 text-left font-bold">Propiedad {status}</p>
                        <p className="pb-2 text-left text-xl text-green-700">{price}</p>
                    </div>
                    <div className="pb-4">
                        <Button to={"/"}>Ir a propiedad</Button>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default PropertyCard;