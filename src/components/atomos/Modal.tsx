import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { hasCookie } from '../../utils/cookie';

interface LoginRegisterModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const LoginRegisterModal: React.FC<LoginRegisterModalProps> = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const [isOpen, setIsOpen] = useState(true); // Estado interno para abrir/cerrar
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  // Determinar si se usa estado interno o externo
  const isControlled = externalIsOpen !== undefined && externalOnClose !== undefined;
  const modalIsOpen = isControlled ? externalIsOpen : isOpen;
  const handleClose = isControlled ? externalOnClose : () => setIsOpen(false);

  // Cuando abro el modal, chequeo si existe sesión
  useEffect(() => {
    if (modalIsOpen && hasCookie('sessionIndicator')) {
      const storedUser = sessionStorage.getItem('userData');
      if (storedUser) {
        handleClose(); // Cierra el modal si el usuario está autenticado
      }
    }
  }, [modalIsOpen, navigate, handleClose]);

  // Escucha tecla Escape para cerrar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose?.();
    };
    if (modalIsOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIsOpen, handleClose]);

  const toggleRegistering = () => setIsRegistering((prev) => !prev);

  if (!modalIsOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {!isRegistering ? (
        <LoginModal
          isOpen={modalIsOpen}
          onClose={handleClose}
          toggleRegistering={toggleRegistering}
        />
      ) : (
        <RegisterModal
          isOpen={modalIsOpen}
          onClose={handleClose}
          toggleRegistering={toggleRegistering}
        />
      )}
    </div>
  );
};

export default LoginRegisterModal;
