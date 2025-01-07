import React, { useState } from 'react';
import { FaTimes, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../contexts/AlertContext';
import { forgotPassword } from '../../services/users/userService';
import CustomButton from './ButtonProfile';

interface ForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      showAlert('info', 'Se ha enviado un correo con las instrucciones para restablecer tu contraseña.');
      onClose();
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('No se pudo enviar el correo. Verifica tu email o intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    navigate('/home');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Restablecer Contraseña</h2>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <CustomButton
            type="submit"
            variant="primary"
            onClick={() => {}}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              'Enviar Instrucciones'
            )}
          </CustomButton>
        </form>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Recibirás un correo con instrucciones para restablecer tu contraseña.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;