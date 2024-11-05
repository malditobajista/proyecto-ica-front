import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidName, isValidPhoneNumber } from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import { UserData } from '../utils/types';
import { userMockData } from '../assets/userMockData';
import Button from '../components/atomos/Button';
import Title from '../components/atomos/Title';
import InputPhone from '../components/atomos/InputPhone';
import { FaInfoCircle } from 'react-icons/fa';

const Perfil: React.FC = () => {
    const [userData, setUserData] = useState<UserData>({
        id: 0,
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        repeatPassword: '',
    });

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        repeatPassword: '',
    });

    // Obtener datos del usuario desde la API
    useEffect(() => {
        // async function fetchUserData() {
        //     try {
        //         const response = await fetch('/api/user-profile'); // Ajusta la URL según tu API
        //         const data = await response.json();
        //         setUserData(data);
        //     } catch (error) {
        //         console.error("Error fetching user data:", error);
        //     }
        // }
        // fetchUserData();
        setUserData(userMockData);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validateFields = () => {
        let newErrors = { ...errors };

        if (!isValidName(userData.nombre)) {
            newErrors.nombre = errorMessages.name.required;
        }
        if (!isValidName(userData.nombre)) {
            newErrors.nombre = errorMessages.name.required;
        }
        if (!isValidName(userData.apellido)) {
            newErrors.apellido = errorMessages.lastname.required;
        }
        if (userData.email === '') {
            newErrors.email = errorMessages.email.required;
        } else if (!isValidEmail(userData.email)) {
            newErrors.email = errorMessages.email.invalid;
        }
        if (userData.telefono === '') {
            newErrors.telefono = errorMessages.telefono.required;
        } else if (!isValidPhoneNumber(userData.telefono)) {
            newErrors.telefono = errorMessages.telefono.invalid;
        }
        if (userData.password === '') {
            newErrors.password = errorMessages.password.required;
        }
        if (userData.repeatPassword !== userData.password) {
            newErrors.repeatPassword = errorMessages.passwordsMismatch;
        }
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateFields()) {
            try {
                const response = await fetch('/api/update-user-profile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData),
                });
                if (response.ok) {
                    alert("Datos actualizados correctamente");
                }
            } catch (error) {
                console.error("Error updating user data:", error);
            }
        }
    };

    return (
        <div className='my-12'>
            <Title text='Perfil de Usuario' />
            <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div>
                        <label className="block text-sm font-medium">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={userData.nombre}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            value={userData.apellido}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.apellido ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                    </div>
                    <div>
                        <InputPhone userData={userData} handleChange={handleChange} errors={errors} />

                    </div>
                    <div>

                        <label className="block text-sm font-medium" htmlFor="password">Contraseña actual</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            maxLength={12}
                            value={userData.password}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                        <div className="group inline-block relative ml-2">
                            <FaInfoCircle className="text-gray-500 hover:text-green-500 cursor-pointer" />
                            <div className="absolute hidden group-hover:block bg-gray-600 text-white text-xs rounded py-1 px-2 bottom-full mb-1 whitespace-nowrap ">
                                {errorMessages.password.formatos}
                            </div>
                        </div>
                    </div>
                    <div>

                        <label className="block text-sm font-medium" htmlFor="repeatPassword">Nueva contraseña</label>
                        <input
                            type="password"
                            name="repeatPassword"
                            placeholder="Repetir Contraseña"
                            maxLength={12}
                            value={userData.repeatPassword}
                            onChange={handleChange}
                            required
                            className={`w-full p-2 border rounded ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}
                    </div>

                    <Button type="submit">
                        Guardar Cambios
                    </Button>
                </form>
            </div>
            <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow-md">
                <div className="flex justify-around md:grid-cols-2  ">
                    <div>
                        <Button to='/mis-propiedades'>Mis propiedades</Button>
                    </div>
                    <div>
                        <Button to='/mis-favoritas'>Mis favoritas</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
