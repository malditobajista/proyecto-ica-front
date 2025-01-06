import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import CustomButton from "./ButtonProfile";
import { errorMessages } from "../../utils/errorMessages";
import { changePassword } from "../../services/users/userService";
import { useAlert } from "../../contexts/AlertContext";

const ChangePassword: React.FC = () => {
  const { showAlert } = useAlert();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validatePasswordFields = () => {
    const newErrors = { ...errors };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = errorMessages.password.required;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = errorMessages.password.required;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = errorMessages.passwordsMismatch;
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePasswordFields()) {
      try {
        const response = await changePassword(passwordData);
        if (response.ok) {
          showAlert("success", "Contraseña actualizada correctamente");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          showAlert("error", "Error al actualizar la contraseña");
        }
      } catch {
        showAlert("error", "Error al actualizar la contraseña");
      }
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="currentPassword"
          >
            Contraseña actual
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handleChange}
            className={`mt-1 block px-1 py-2 w-full rounded-md shadow-sm ${
              errors.currentPassword ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500`}
          />
          {errors.currentPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.currentPassword}
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="newPassword"
          >
            Nueva contraseña
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              className={`block px-1 py-2 w-full pr-10 rounded-md ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <div className="group">
                <FaInfoCircle className="h-5 w-5 text-gray-400" />
                <div className="absolute hidden group-hover:block right-0 bottom-full mb-2 w-48 bg-gray-800 text-white text-xs rounded py-1 px-2">
                  {errorMessages.password.formatos}
                </div>
              </div>
            </div>
          </div>
          {errors.newPassword && (
            <p className="mt-2 text-sm text-red-600">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="confirmPassword"
          >
            Confirmar nueva contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            className={`mt-1 px-1 py-2 block w-full rounded-md shadow-sm ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } focus:border-indigo-500 focus:ring-indigo-500`}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <CustomButton type="submit" variant="primary">
            Cambiar Contraseña
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
