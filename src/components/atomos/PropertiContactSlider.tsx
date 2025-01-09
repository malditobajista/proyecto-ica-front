import React, { useState } from 'react';
import ContactForm from './ContactForm';
import RentalModal from './RentForm';

interface PropertyContactSliderProps {
  propertyId: number;
}

const DRAG_THRESHOLD = 50; // píxeles

const PropertyContactSlider: React.FC<PropertyContactSliderProps> = ({ propertyId }) => {
  const [isContactForm, setIsContactForm] = useState(true);

  // Estados para el "arrastre"
  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStartX(e.clientX);

    // Suscribimos a eventos globales
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    // Aquí podrías mostrar algún feedback visual mientras arrastras
    // (si quisieras un slider real), pero en este ejemplo no se hace nada.
  };

  const handleMouseUp = (e: MouseEvent) => {
    setDragging(false);

    // Calculamos la diferencia final entre el mouseDown y el mouseUp
    const diff = e.clientX - startX;

    // Si la diferencia supera el umbral, alternamos formulario:
    if (Math.abs(diff) > DRAG_THRESHOLD) {
      // diff > 0 => arrastró hacia la derecha => mostramos ContactForm
      // diff < 0 => arrastró hacia la izquierda => mostramos RentalModal
      setIsContactForm(diff > 0);
    }

    // Cancelamos subscripción a los eventos
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="pb-4 cursor-grab active:cursor-grabbing">
      <div
        // Aquí enganchamos el mouseDown para iniciar el 'drag'
        onMouseDown={handleMouseDown}
        // Opcional: style={{ cursor: 'grab' }} si gustas
      >
                <hr className='md:hidden'/>

        {/* Contact Form */}
        <div className={`w-full ${!isContactForm ? 'hidden' : ''}`}>
          <ContactForm propertyId={propertyId} />
        </div>


        {/* Rental Modal */}
        <div className={`w-full ${isContactForm ? 'hidden' : ''}`}>
          <RentalModal propertyId={propertyId} />
        </div>
      </div>

      {/* Dots de navegación manual */}
      <div className="mt-4 flex justify-center">
        <div className="flex space-x-2">
          <div
            className={`w-2 h-2 rounded-full cursor-pointer ${
              isContactForm ? 'bg-accent' : 'bg-gray-300'
            }`}
            onClick={() => setIsContactForm(true)}
            role="tab"
            aria-selected={isContactForm}
            aria-label="Contact Form"
            tabIndex={0}
          ></div>
          <div
            className={`w-2 h-2 rounded-full cursor-pointer ${
              !isContactForm ? 'bg-accent' : 'bg-gray-300'
            }`}
            onClick={() => setIsContactForm(false)}
            role="tab"
            aria-selected={!isContactForm}
            aria-label="Rental Form"
            tabIndex={0}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyContactSlider;
