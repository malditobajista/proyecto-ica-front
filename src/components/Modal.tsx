import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [isRegistering, setIsRegistering] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repeatPassword: '',
        telefono: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log(formData);
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
                <h2 className="text-xl font-bold mb-4">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                maxLength={12}
                                pattern="^[a-zA-Z]+$"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                maxLength={12}
                                pattern="^[a-zA-Z]+$"
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        maxLength={30}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        maxLength={12}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {isRegistering && (
                        <>
                            <input
                                type="password"
                                name="repeatPassword"
                                placeholder="Repetir Contraseña"
                                maxLength={12}
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono (0xx xxx xxx)"
                                pattern="^0\d{2} \d{3} \d{3}$"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </>
                    )}
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </form>
                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    className="mt-4 text-blue-500 underline"
                >
                    {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                </button>
            </div>
        </div>
    );
};

export default Modal;