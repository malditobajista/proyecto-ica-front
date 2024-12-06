import React, { useState } from "react";
import HeartIcon from "../../assets/heartIcon";

const FavouriteButton = () => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <button
      className={`py-2 px-3 transition duration-300 ${
        isFavourite
          ? "text-red-500 border-red-500"
          : "text-white border-white hover:text-red-500 hover:border-red-500"
      }`}
      onClick={() => setIsFavourite(!isFavourite)}
    >
      <HeartIcon
        className="w-6 h-6"      />
    </button>
  );
};

export default FavouriteButton;
