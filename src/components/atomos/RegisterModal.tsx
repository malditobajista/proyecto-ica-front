import React, { useEffect, useState } from 'react';
import Title from './Title';
import { registerUser } from '../../services/users/userService';
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../utils/validations';
import { errorMessages } from '../../utils/errorMessages';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleRegistering: () => void;

}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, toggleRegistering }) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      phone: '',
    };

    // firstName
    if (!formData.firstName) {
      newErrors.firstName = errorMessages.firstName.required;
    } else if (!isValidName(formData.firstName)) {
      newErrors.firstName = errorMessages.firstName.invalid;
    }
    // lastName
    if (!formData.lastName) {
      newErrors.lastName = errorMessages.lastName.required;
    } else if (!isValidName(formData.lastName)) {
      newErrors.lastName = errorMessages.lastName.invalid;
    }
    // email
    if (!formData.email) {
      newErrors.email = errorMessages.email.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    }
    // password
    if (!formData.password) {
      newErrors.password = errorMessages.password.required;
    } else if (formData.password.length < 6) {
      newErrors.password = errorMessages.password.formatos;
    }
    // repeatPassword
    if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = errorMessages.passwordsMismatch;
    }
    // phone
    if (!formData.phone) {
      newErrors.phone = errorMessages.phone.required;
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = errorMessages.phone.invalid;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      const data = await registerUser(formData );
      console.log('Registro exitoso:', data);
      setSuccessMessage('Registro exitoso. ¡Bienvenido!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error en el registro:', error);
      setErrorMessage('Error en el registro. Por favor, inténtalo de nuevo.');
    }
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
          &times;
        </button>
        <Title text="Registro" clase="mt-0 pt-0" />

        {successMessage && (
          <div
            className="bg-green-100 border border-green-300 text-green-500 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">{successMessage}</strong>
            <button
              onClick={() => setSuccessMessage(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="text-green-600">×</span>
            </button>
          </div>
        )}

        {errorMessage && (
          <div
            className="bg-red-100 border border-red-300 text-red-500 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">{errorMessage}</strong>
            <button
              onClick={() => setErrorMessage(null)}
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
            >
              <span className="text-red-700">×</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <input
            type="text"
            name="firstName"
            placeholder="Nombre"
            maxLength={20}
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded text-black ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

          <input
            type="text"
            name="lastName"
            placeholder="Apellidos"
            maxLength={20}
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded text-black ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            maxLength={50}
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded text-black ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            maxLength={20}
            value={formData.password}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded text-black ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <input
            type="password"
            name="repeatPassword"
            placeholder="Repetir Contraseña"
            maxLength={20}
            value={formData.repeatPassword}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded text-black ${
              errors.repeatPassword ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono (0xx xxx xxx)"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`w-full p-2 border rounded text-black ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

          <button type="submit" className="w-full bg-green-300 hover:bg-green-500 text-white p-2 rounded">
            Registrarse
          </button>
        </form>

        <div className="flex justify-center mt-4">
                    <button
                        onClick={() => toggleRegistering()}
                        className="mt-4 text-gray-500 hover:text-green-500"
                    >
                        {'¿Ya tienes una cuenta? Inicia sesión'}
                    </button>
                </div>
      </div>
    </div>
  );
};

export default RegisterModal;
