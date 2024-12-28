import React, { useRef, useState, useEffect } from "react";
import {
  FaBed,
  FaBath,
  FaCar,
  FaSwimmingPool,
  FaRulerCombined,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface PropertyFeaturesProps {
  property: {
    rooms?: number;
    bathrooms?: number;
    garages?: boolean;
    pool?: boolean;
    area?: number;
    lotSize?: number;
    yearBuilt?: string;
  };
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ property }) => {
  // Arreglo de características
  const features = [
    { icon: FaBed, label: "Dormitorios", value: property.rooms },
    { icon: FaBath, label: "Baños", value: property.bathrooms },
    { icon: FaCar, label: "Garage", value: property.garages ? "Sí" : "No" },
    {
      icon: FaSwimmingPool,
      label: "Piscina",
      value: property.pool ? "Sí" : "No",
    },
    {
      icon: FaRulerCombined,
      label: "Área",
      value: property.area ? `${property.area} m²` : undefined,
    },
    {
      icon: FaRulerCombined,
      label: "Lote",
      value: property.lotSize ? `${property.lotSize} m²` : undefined,
    },
    {
      icon: FaCalendarAlt,
      label: "Año de construcción",
      value: property.yearBuilt,
    },
  ].filter((f) => f.value !== undefined);

  // Referencia al contenedor para el drag
  const carouselRef = useRef<HTMLDivElement>(null);

  // Estados para el drag
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Cuando el mouse baja (mousedown) empezamos a “arrastrar”
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  // Cuando el mouse se mueve, si estamos arrastrando, desplazamos el scroll
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    // A mayor factor, mayor velocidad de desplazamiento
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Cuando soltamos el mouse o salimos del área, termina el drag
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Flechas para mover el contenedor
  const handlePrev = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Evitar que, si redimensionan la ventana, el drag se “rompa”
  useEffect(() => {
    const stopDrag = () => setIsDragging(false);
    window.addEventListener("resize", stopDrag);
    return () => window.removeEventListener("resize", stopDrag);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Flecha Izquierda */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2
                   bg-white/80 hover:bg-white p-2 rounded-full shadow
                   z-10 flex items-center justify-center"
      >
        <FaChevronLeft className="text-gray-700 w-4 h-4" />
      </button>

      {/* Contenedor “draggable” */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide
                   cursor-grab active:cursor-grabbing mx-8"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div key={i} className="flex-none w-32 p-2">
              <div
                className="bg-white rounded p-4 flex flex-col
                           items-center justify-center text-center"
              >
                {/* Ícono con tamaño por defecto */}
                <Icon className="text-primary text-2xl mb-2" />
                <span className="text-sm font-medium">{feature.label}</span>
                <span className="text-sm font-semibold">{feature.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Flecha Derecha */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2
                   bg-white/80 hover:bg-white p-2 rounded-full shadow
                   z-10 flex items-center justify-center"
      >
        <FaChevronRight className="text-gray-700 w-4 h-4" />
      </button>
    </div>
  );
};

export default PropertyFeatures;
