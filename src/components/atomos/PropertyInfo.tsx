import { Property } from "../../utils/types";
import React from "react";
import { StatusBadge } from "./StatusBadge";

interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  return (
    <article className="w-full bg-white rounded mr-4 dark:bg-surface-dark dark:text-gray-800 relative md:w-2/4">
      <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-6 mb-4 px-5">
        {/* Left Column */}
        <div className="grid gap-6 h-full">
          <div>
            <h2 className="text-xl font-bold text-lime-600 mb-4">Estado</h2>
            <div
              className="flex flex-wrap gap-2 text-center justify-center"
              role="list"
              aria-label="Property statuses"
            >
              {property.status.map((s) => (
                <StatusBadge key={s} status={s} />
              ))}
            </div>
          </div>
          <div className="flex flex-col h-full"> {/* Diseño vertical */}
            <h2 className="text-xl font-bold text-lime-600">Barrio</h2>
            <p className="text-blue-600 font-bold">{property.neighborhood}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-6 h-full">
          <div>
            <h2 className="text-xl font-bold text-lime-600 mb-4">Dirección</h2>
            <p className="break-words">{property.address}</p>
          </div>
          <div className="flex flex-col h-full"> {/* Diseño vertical */}
            <h2 className="text-xl font-bold text-lime-600">Contribución</h2>
            <p>$ {Number(property.contribucion).toLocaleString("de-DE")} por año</p>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div>
        <h2 className="text-xl font-bold mb-2">Descripción completa</h2>
        <p>{property.longDescription}</p>
      </div>
    </article>
  );
};

export default PropertyInfo;
