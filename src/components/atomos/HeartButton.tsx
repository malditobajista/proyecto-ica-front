import React from "react";
import HeartIcon from "../../assets/heartIcon";


interface FavButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isFavourite: boolean;
  className?: string;
}


const FavButton: React.FC<FavButtonProps> = ({ onClick, isFavourite, className }) => {
  return (
    <button
      className={`py-2 px-3 transition duration-300 ${className} ${
        isFavourite
          ? "text-red-500 border-red-500"
          : "text-white hover:text-red-500 hover:border-red-500"
      }`}
      onClick={onClick}
    >
      <HeartIcon clase="w-6 h-6" />
    </button>
  );
};

export default FavButton;

