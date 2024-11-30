// import React, { useState } from "react";
// import HeartIcon from "../../assets/heartIcon";

// interface FavButtonProps {
//   onClick: () => void; // Prop para manejar el clic
// }

// const FavButton: React.FC<FavButtonProps> = ({ onClick }) => {
//   const [isFavourite, setIsFavourite] = useState(false);

//   const handleClick = () => {
//     setIsFavourite((prev) => !prev); // Alternar el estado interno
//     onClick(); // Llamar a la función pasada como prop
//   };

//   return (
//     <button
//       className={`py-2 px-3 transition duration-300 ${isFavourite
//         ? "text-red-500 border-red-500"
//         : "text-white border-white hover:text-red-500 hover:border-red-500"
//         }`}
//       onClick={handleClick} // Usar el nuevo manejador de clic
//     >
//       <HeartIcon clase="w-6 h-6" />
//     </button>
//   );
// };

// export default FavButton;
import React, { useState } from "react";
import HeartIcon from "../../assets/heartIcon";

interface FavButtonProps {
  onClick: () => void; // Prop para manejar el clic
  className?: string; // Prop para la clase adicional
}

const FavButton: React.FC<FavButtonProps> = ({ onClick, className }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleClick = () => {
    setIsFavourite((prev) => !prev); // Alternar el estado interno
    onClick(); // Llamar a la función pasada como prop
  };

  return (
    <button
      className={`py-2 px-3 transition duration-300 ${className} ${isFavourite
        ? "text-red-500 border-red-500"
        : "text-white border-white hover:text-red-500 hover:border-red-500"
        }`}
      onClick={handleClick} // Usar el nuevo manejador de clic
    >
      <HeartIcon clase="w-6 h-6" />
    </button>
  );
};

export default FavButton;