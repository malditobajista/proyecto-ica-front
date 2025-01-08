'use client'

import React, { useEffect, useState } from 'react'
import Title from './Title'
import { FaTimes, FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAlert } from '../../contexts/AlertContext'
import { registerUser, getUsers } from '../../services/users/userService'
import { errorMessages } from '../../utils/errorMessages'
import { isValidName, isValidEmail, isValidPhoneNumber } from '../../utils/validations'
import CustomButton from './ButtonProfile'

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  toggleRegistering: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, toggleRegistering }) => {
  const { showAlert } = useAlert()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateFields = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      phone: '',
    }

    if (!formData.firstName) {
      newErrors.firstName = errorMessages.firstName.required
    } else if (!isValidName(formData.firstName)) {
      newErrors.firstName = errorMessages.firstName.invalid
    }
    if (!formData.lastName) {
      newErrors.lastName = errorMessages.lastName.required
    } else if (!isValidName(formData.lastName)) {
      newErrors.lastName = errorMessages.lastName.invalid
    }
    if (!formData.email) {
      newErrors.email = errorMessages.email.required
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = errorMessages.email.invalid
    }
    if (!formData.password) {
      newErrors.password = errorMessages.password.required
    } else if (formData.password.length < 6) {
      newErrors.password = errorMessages.password.formatos
    }
    if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = errorMessages.passwordsMismatch
    }
    if (!formData.phone) {
      newErrors.phone = errorMessages.phone.required
    } else if (!isValidPhoneNumber(formData.phone)) {
      newErrors.phone = errorMessages.phone.invalid
    }

    setErrors(newErrors)
    return Object.values(newErrors).every(err => err === '')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateFields()) return
  
    try {
      await registerUser(formData)
      const user = await getUsers()
      sessionStorage.setItem('userData', JSON.stringify(user))
      showAlert("success", `Registro exitoso. ¡Bienvenido ${user.firstName}!`)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error en el registro:', error)
      showAlert("error", "Error en el registro. Por favor, inténtalo de nuevo.")
    }
  }

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <FaTimes className="h-6 w-6" />
        </button>
        <Title text="Registro" clase="mt-0 pt-0 text-2xl font-bold mb-6 text-center" />

        {successMessage && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
            role="alert"
          >
            <p>{successMessage}</p>
            <button
              onClick={() => setSuccessMessage(null)}
              className="absolute top-0 right-0 p-4"
              aria-label="Cerrar mensaje de éxito"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="absolute top-0 right-0 p-4"
              aria-label="Cerrar mensaje de error"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              maxLength={20}
              value={formData.firstName}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}

          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="lastName"
              placeholder="Apellidos"
              maxLength={20}
              value={formData.lastName}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.lastName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              maxLength={50}
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              maxLength={20}
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {!showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type={showRepeatPassword ? "text" : "password"}
              name="repeatPassword"
              placeholder="Repetir Contraseña"
              maxLength={20}
              value={formData.repeatPassword}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.repeatPassword ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {!showRepeatPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
            </button>
          </div>
          {errors.repeatPassword && <p className="text-red-500 text-xs">{errors.repeatPassword}</p>}

          <div className="relative">
            <FaPhone className="absolute top-3 left-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono (0xx xxx xxx)"
              value={formData.phone}
              onChange={handleChange}
              required
              className={`w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

          <CustomButton type="submit" variant="primary" onClick={() => {}}>
            Registrarse
          </CustomButton>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={toggleRegistering}
            className="text-sm text-gray-600 hover:text-green-500 transition-colors duration-200"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterModal

