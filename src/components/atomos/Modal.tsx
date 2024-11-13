// import { useEffect, useState } from 'react';
// import { isValidEmail, isValidName, isValidPhoneNumber } from '../../utils/validations';
// import { errorMessages } from '../../utils/errorMessages';
// import Title from './Title';

// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
// }

// const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
//     // Cambiar el valor inicial a false para mostrar primero "Iniciar Sesión"
//     const [isRegistering, setIsRegistering] = useState(false);

//     const [formData, setFormData] = useState({
//         nombre: '',
//         apellido: '',
//         email: '',
//         password: '',
//         repeatPassword: '',
//         telefono: '',
//     });

//     const [errors, setErrors] = useState({
//         nombre: '',
//         apellido: '',
//         email: '',
//         password: '',
//         repeatPassword: '',
//         telefono: '',
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//         setErrors({ ...errors, [name]: '' });
//     };

//     const validateFields = () => {
//         const newErrors = { ...errors };

//         if (isRegistering) {
//             if (formData.nombre === '') {
//                 newErrors.nombre = errorMessages.name.required;
//             } else if (!isValidName(formData.nombre)) {
//                 newErrors.nombre = errorMessages.name.invalid;
//             }

//             if (formData.apellido === '') {
//                 newErrors.apellido = errorMessages.lastname.required;
//             } else if (!isValidName(formData.apellido)) {
//                 newErrors.apellido = errorMessages.lastname.invalid;
//             }
//             // }

//             if (formData.email === '') {
//                 newErrors.email = errorMessages.email.required;
//             } else if (!isValidEmail(formData.email)) {
//                 newErrors.email = errorMessages.email.invalid;
//             }

//             if (formData.password === '') {
//                 newErrors.password = errorMessages.password.required;
//             } else if (formData.password.length < 6) {
//                 newErrors.password = errorMessages.password.invadlid;
//             }
//         }
//         if (isRegistering) {
//             if (formData.repeatPassword !== formData.password) {
//                 newErrors.repeatPassword = errorMessages.passwordsMismatch;
//             }
//         }

//         if (formData.telefono === '') {
//             newErrors.telefono = errorMessages.telefono.required;
//         } else if (!isValidPhoneNumber(formData.telefono)) {
//             newErrors.telefono = errorMessages.telefono.invalid;
//         }

//         setErrors(newErrors);
//         return Object.values(newErrors).every((error) => error === '');
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         if (validateFields()) {
//             // Manejar el envío del formulario aquí
//         }
//     };

//     const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
//         if (e.target === e.currentTarget) {
//             onClose();
//         }
//     };

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             if (e.key === 'Escape') {
//                 onClose();
//             }
//         };

//         if (isOpen) {
//             window.addEventListener('keydown', handleKeyDown);
//         }

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//         };
//     }, [isOpen, onClose]);

//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//             onClick={handleOutsideClick}
//         >
//             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
//                 <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">
//                     &times;
//                 </button>
//                 {/* <h2 className="text-xl font-bold mb-4">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2> */}
//                 <Title text={isRegistering ? 'Registro' : 'Iniciar Sesión'} clase="mt-0 pt-0" />
//                 <form onSubmit={handleSubmit} className="space-y-4" noValidate>
//                     {isRegistering && (
//                         <>
//                             <input
//                                 type="text"
//                                 name="nombre"
//                                 placeholder="Nombre"
//                                 maxLength={12}
//                                 value={formData.nombre}
//                                 onChange={handleChange}
//                                 required
//                                 className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
//                             />
//                             {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}

//                             <input
//                                 type="text"
//                                 name="apellido"
//                                 placeholder="Apellido"
//                                 maxLength={12}
//                                 value={formData.apellido}
//                                 onChange={handleChange}
//                                 required
//                                 className={`w-full p-2 border rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
//                             />
//                             {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}
//                         </>
//                     )}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         maxLength={30}
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Contraseña"
//                         maxLength={15}
//                         value={formData.password}
//                         onChange={handleChange}
//                         required
//                         className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
//                     />
//                     {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

//                     {isRegistering && (
//                         <>
//                             <input
//                                 type="password"
//                                 name="repeatPassword"
//                                 placeholder="Repetir Contraseña"
//                                 maxLength={15}
//                                 value={formData.repeatPassword}
//                                 onChange={handleChange}
//                                 required
//                                 className={`w-full p-2 border rounded ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'}`}
//                             />
//                             {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}

//                             <input
//                                 type="tel"
//                                 name="telefono"
//                                 placeholder="Teléfono (0xx xxx xxx)"
//                                 value={formData.telefono}
//                                 onChange={handleChange}
//                                 required
//                                 className={`w-full p-2 border rounded ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
//                             />
//                             {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono}</p>}
//                         </>
//                     )}
//                     <button type="submit" className="w-full bg-green-300 hover:bg-green-500 text-white p-2 rounded">
//                         {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
//                     </button>
//                 </form>
//                 <div className="flex justify-center mt-4">
//                     <button
//                         onClick={() => setIsRegistering(!isRegistering)}
//                         className="mt-4 text-gray-500 hover:text-green-500"
//                     >
//                         {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;
import { useEffect, useState } from 'react';
import { isValidEmail, isValidName, isValidPhoneNumber } from '../../utils/validations';
import { errorMessages } from '../../utils/errorMessages';
import Title from './Title';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    // Cambiar el valor inicial a false para mostrar primero "Iniciar Sesión"
    const [isRegistering, setIsRegistering] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        repeatPassword: '',
        telefono: '',
    });

    const [errors, setErrors] = useState({
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
        setErrors({ ...errors, [name]: '' });
    };
    const toggleRegistering = () => {
        setErrors({
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            repeatPassword: '',
            telefono: '',
        });
        setIsRegistering(!isRegistering);
    };


    const validateFields = () => {
        const newErrors: {
            nombre: string;
            apellido: string;
            email: string;
            password: string;
            repeatPassword: string;
            telefono: string;
        } = {
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            repeatPassword: '',
            telefono: '',
        };

        // Validaciones generales (para ambos casos)
        if (formData.email === '') {
            newErrors.email = errorMessages.email.required;
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = errorMessages.email.invalid;
        }

        if (formData.password === '') {
            newErrors.password = errorMessages.password.required;
        } else if (formData.password.length < 6) {
            newErrors.password = errorMessages.password.formatos;
        }

        // Validaciones específicas para el registro
        if (isRegistering) {
            if (formData.nombre === '') {
                newErrors.nombre = errorMessages.name.required;
            } else if (!isValidName(formData.nombre)) {
                newErrors.nombre = errorMessages.name.invalid;
            }

            if (formData.apellido === '') {
                newErrors.apellido = errorMessages.lastname.required;
            } else if (!isValidName(formData.apellido)) {
                newErrors.apellido = errorMessages.lastname.invalid;
            }

            if (formData.repeatPassword !== formData.password) {
                newErrors.repeatPassword = errorMessages.passwordsMismatch;
            }

            if (formData.telefono === '') {
                newErrors.telefono = errorMessages.telefono.required;
            } else if (!isValidPhoneNumber(formData.telefono)) {
                newErrors.telefono = errorMessages.telefono.invalid;
            }
        }

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateFields()) {
            // Manejar el envío del formulario aquí
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
                {/* <h2 className="text-xl font-bold mb-4">{isRegistering ? 'Registro' : 'Iniciar Sesión'}</h2> */}
                <Title text={isRegistering ? 'Registro' : 'Iniciar Sesión'} clase="mt-0 pt-0" />
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {isRegistering && (
                        <>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                maxLength={12}
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}

                            <input
                                type="text"
                                name="apellido"
                                placeholder="Apellido"
                                maxLength={12}
                                value={formData.apellido}
                                onChange={handleChange}
                                required
                                className={`w-full p-2 border rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        maxLength={30}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        maxLength={15}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

                    {isRegistering && (
                        <>
                            <input
                                type="password"
                                name="repeatPassword"
                                placeholder="Repetir Contraseña"
                                maxLength={15}
                                value={formData.repeatPassword}
                                onChange={handleChange}
                                required
                                className={`w-full p-2 border rounded ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}

                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Teléfono (0xx xxx xxx)"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                                className={`w-full p-2 border rounded ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.telefono && <p className="text-red-500 text-xs">{errors.telefono}</p>}
                        </>
                    )}
                    <button type="submit" className="w-full bg-green-300 hover:bg-green-500 text-white p-2 rounded">
                        {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </form>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={() => toggleRegistering()}
                        className="mt-4 text-gray-500 hover:text-green-500"
                    >
                        {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes una cuenta? Regístrate'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
