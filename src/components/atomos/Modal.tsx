import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { hasCookie } from '../../utils/cookie';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginRegisterModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Cuando abro el modal, chequeo si existe userData
  // Si existe, mando a /profile y cierro el modal
  useEffect(() => {
    if (isOpen && hasCookie('sessionIndicator')) {
      const storedUser = sessionStorage.getItem('userData');
      if (storedUser) {
        navigate('/profile');
        onClose();
      }
    }
  }, [isOpen, navigate, onClose]);

  // Escucha tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const toggleRegistering = () => setIsRegistering(!isRegistering);

  if (!isOpen) return null;

  return (
    <>
      {!isRegistering ? (
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          toggleRegistering={toggleRegistering}
        />
      ) : (
        <RegisterModal
          isOpen={isOpen}
          onClose={onClose}
          toggleRegistering={toggleRegistering}
        />
      )}
    </>
  );
};

export default LoginRegisterModal;
