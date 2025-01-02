import React, { useEffect, useState } from 'react';
import { isValidEmail, isValidName, isValidPhoneNumber } from '../utils/validations';
import { errorMessages } from '../utils/errorMessages';
import { UserData } from '../utils/types';
import Title from '../components/atomos/Title';
import InputPhone from '../components/atomos/InputPhone';
import ChangePassword from '../components/atomos/ChangePassword';
import CustomButton from '../components/atomos/ButtonProfile';
import { updateUser } from '../services/users/userService';
import { useNavigate } from 'react-router-dom';
import { hasCookie } from '../utils/cookie';

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = sessionStorage.getItem('userData');
    console.log(hasCookie('sessionIndicator'));
    if (storedData && hasCookie('sessionIndicator')) {
      setUserData(JSON.parse(storedData));
    } else {
        console.log('No hay datos de usuario');
        navigate('/home');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => (prev ? { ...prev, [name]: value } : null));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateFields = () => {
    if (!userData) return false; // Si no hay datos, no se valida

    const newErrors = { ...errors };

    if (!userData.firstName || !isValidName(userData.firstName)) {
      newErrors.firstName = errorMessages.firstName.invalid;
    } else {
      newErrors.firstName = '';
    }

    if (!userData.lastName || !isValidName(userData.lastName)) {
      newErrors.lastName = errorMessages.lastName.invalid;
    } else {
      newErrors.lastName = '';
    }

    if (!userData.email) {
      newErrors.email = errorMessages.email.required;
    } else if (!isValidEmail(userData.email)) {
      newErrors.email = errorMessages.email.invalid;
    } else {
      newErrors.email = '';
    }

    if (!userData.phone) {
      newErrors.phone = errorMessages.phone.required;
    } else if (!isValidPhoneNumber(userData.phone)) {
      newErrors.phone = errorMessages.phone.invalid;
    } else {
      newErrors.phone = '';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateFields() && userData) {
      try {
        const response = await updateUser(userData);
        if (response.ok) {
          sessionStorage.setItem('userData', JSON.stringify(userData));
          alert('Datos actualizados correctamente');
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {userData && (
        <div className="max-w-3xl mx-auto">
          <Title text="Perfil de Usuario" />
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    className={`mt-1 px-1 py-2 block w-full rounded-md shadow-sm ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                  {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    className={`mt-1 block px-1 py-2 w-full rounded-md shadow-sm ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:border-indigo-500 focus:ring-indigo-500`}
                  />
                  {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-1 py-2 rounded-md shadow-sm ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:border-indigo-500 focus:ring-indigo-500`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <InputPhone
                userData={userData}
                handleChange={handleChange}
                errors={{ phone: errors.phone }}
              />

              <div className="flex justify-between items-center pt-4">
                <CustomButton type="submit" variant="primary">
                  Guardar Cambios
                </CustomButton>
                <CustomButton
                  onClick={() => setShowPasswordModal(!showPasswordModal)}
                  variant="outline"
                >
                  {showPasswordModal ? 'Ocultar cambio de contraseña' : 'Cambiar contraseña'}
                </CustomButton>
              </div>
            </form>

            {showPasswordModal && (
              <div className="border-t border-gray-200 mt-6 pt-6">
                <ChangePassword />
              </div>
            )}
          </div>

          <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 flex justify-around">
              <CustomButton
                onClick={() => (window.location.href = '/properties/created')}
                variant="secondary"
              >
                Mis propiedades
              </CustomButton>
              <CustomButton
                onClick={() => (window.location.href = '/properties/favourites')}
                variant="secondary"
              >
                Mis favoritas
              </CustomButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

