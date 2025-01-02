import React, { useEffect, useState } from 'react';
import Title from './Title';
import { getUsers, loginUser } from '../../services/users/userService';
import { isValidEmail } from '../../utils/validations';
import { errorMessages } from '../../utils/errorMessages';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  toggleRegistering: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, toggleRegistering  }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = errorMessages.email.required;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid;
    }
    if (!formData.password) {
      newErrors.password = errorMessages.password.required;
    } else if (formData.password.length < 6) {
      newErrors.password = errorMessages.password.formatos;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) return;

    try {
      await loginUser(formData.email, formData.password);
      const user = await getUsers();
      sessionStorage.setItem('userData', JSON.stringify(user));
      onClose();
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorMessage('Error en el inicio de sesión. Por favor, inténtalo de nuevo.');
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
        <Title text="Iniciar Sesión" clase="mt-0 pt-0" />

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

          <button type="submit" className="w-full bg-green-300 hover:bg-green-500 text-white p-2 rounded">
            Iniciar Sesión
          </button>
        </form>

                 <div className="flex justify-center mt-4">
                     <button
                        onClick={()=>toggleRegistering()}
                        className="mt-4 text-gray-500 hover:text-green-500"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </button>
                </div>
      </div>
    </div>
  );
};

export default LoginModal;
