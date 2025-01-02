import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { errorMessages } from '../../utils/errorMessages';

interface InputPhoneProps {
  userData: {
    phone: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: {
    phone: string;
  };
}

const InputPhone: React.FC<InputPhoneProps> = ({ userData, handleChange, errors }) => {
  return (
    <div className="relative">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
        Teléfono
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={userData.phone}
          onChange={handleChange}
          className={`block w-full px-1 py-2 pr-10 rounded-md ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
        />

        {/* Contenedor “group” para mostrar tooltip al hacer hover */}
        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-auto pr-3">
          <div className="group relative">
            {/* Ícono de información */}
            <FaInfoCircle className="h-5 w-5 text-gray-400 cursor-pointer" />

            {/* El tooltip, oculto por defecto; aparece con group-hover:block */}
            <div className="absolute hidden group-hover:block right-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2">
              {/* Aquí va tu mensaje */}
              {errorMessages.phone.formatos}
              {/* Ejemplo: "Formato: 0xx xxx xxx" */}
            </div>
          </div>
        </div>
      </div>

      {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
    </div>
  );
};

export default InputPhone;
