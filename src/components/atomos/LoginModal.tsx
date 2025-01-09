'use client'

import React, { useEffect, useState } from 'react'
import Title from './Title'
import { FaTimes, FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa'
import { useAlert } from '../../contexts/AlertContext'
import { loginUser, getUsers } from '../../services/users/userService'
import { errorMessages } from '../../utils/errorMessages'
import { isValidEmail } from '../../utils/validations'
import CustomButton from './ButtonProfile'
import { useNavigate } from 'react-router-dom'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  toggleRegistering: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, toggleRegistering }) => {
  const { showAlert } = useAlert()
  const navigate = useNavigate();
  
    
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateFields = () => {
    const newErrors = { email: '', password: '' }

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

    setErrors(newErrors)
    return Object.values(newErrors).every(error => error === '')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateFields()) return
  
    try {
      await loginUser(formData.email, formData.password)
      const user = await getUsers()
      sessionStorage.setItem('userData', JSON.stringify(user))
      navigate('/home')
      showAlert("success", "Inicio de sesión exitoso")
      onClose()
    } catch (error) {
      console.error('Error en el login:', error)
      showAlert("error", "Error en el inicio de sesión. Por favor, inténtalo de nuevo.")
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
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
          <FaTimes className="h-6 w-6" />
        </button>
        <Title text="Iniciar Sesión" clase="mt-0 pt-0 text-2xl font-bold mb-6 text-center" />

        {errorMessage && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
            role="alert"
          >
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorMessage(null)}
              className="absolute top-0 right-0 p-4"
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

          <CustomButton type="submit" variant="primary" onClick={() => {}}>
            Iniciar Sesión
          </CustomButton>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={toggleRegistering}
            className="text-sm text-gray-600 hover:text-green-500 transition-colors duration-200"
          >
            ¿No tienes una cuenta? Regístrate
          </button>
        </div>
        <div className="mt-2 text-center">
        <button
            onClick={() => {
            onClose();
            navigate('/forgot-password'); // Navega a la página de Forgot Password
            }}
            className="text-sm text-gray-600 hover:text-accent"
        >
            Me olvidé mi contraseña
        </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal

