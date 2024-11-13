
import React, { useState } from 'react';
import Button from './atomos/Button';
import TextareaField from './atomos/TextareaField';
import { isValidEmail, isValidPhoneNumber } from '../utils/validations';
import Recaptcha from './atomos/Recaptcha';
import { errorMessages } from '../utils/errorMessages'; // Asegúrate de que la ruta sea correcta

const FormContacto: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telefono: '',
        message: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        telefono: '',
        message: '',
        recaptcha: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };


    const [isChecked, setIsChecked] = useState(false);
    const validateForm = () => {
        const newErrors = {
            name: formData.name ? '' : errorMessages.name.required,
            email: formData.email ? '' : errorMessages.email.required,
            message: formData.message ? '' : errorMessages.message.required,
            telefono: formData.telefono ? '' : errorMessages.telefono.required,
            recaptcha: isChecked ? '' : errorMessages.recaptcha.required,
        };

        // Validación de formato adicional
        if (formData.email && !isValidEmail(formData.email)) {
            newErrors.email = errorMessages.email.invalid;
        }
        if (formData.telefono && !isValidPhoneNumber(formData.telefono)) {
            newErrors.telefono = errorMessages.telefono.invalid;
        }

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Formulario enviado:', formData);
            // lógica de envío del formulario con fetch
        }
    };

    const handleRecaptchaError = (error: string) => {
        setErrors((prevErrors) => ({ ...prevErrors, recaptcha: error }));
    };

    const MAX_DESCRIPTION_CHARACTERS = 500;

    return (
        <section id="contact-form" className="p-4 max-w-lg mx-auto">
            <form
                className="space-y-4"
                method="post"
                action="https://www.inmobiliariacostaazul.com/wp-admin/admin-ajax.php"
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-semibold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`border p-2 rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Tu Nombre"
                        required
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`border p-2 rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Tu Correo Electrónico"
                        required
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>

                <div className="flex flex-col">
                    <label htmlFor="telefono" className="text-sm font-semibold">Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        id="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className={`border p-2 rounded-md ${errors.telefono ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Tu Teléfono"
                    />
                    {errors.telefono && <span className="text-red-500 text-sm">{errors.telefono}</span>}
                </div>

                <div className="flex flex-col">
                    <TextareaField
                        label="Mensaje"
                        value={formData.message}
                        onChange={handleChange}
                        name="message"
                        error={errors.message}
                        maxLength={MAX_DESCRIPTION_CHARACTERS}
                        rows={10}
                    />
                </div>

                <Button
                    type="submit"
                    clase="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar
                </Button>
                <div className="flex flex-col justify-center">
                    <Recaptcha onError={handleRecaptchaError} isChecked={isChecked} setIsChecked={setIsChecked} />
                    {errors.recaptcha && <span className="text-red-500 text-sm">{errors.recaptcha}</span>}
                </div>

            </form>

            <div id="error-container" className="text-red-500"></div>
            <div id="message-container" className="text-green-500"></div>
        </section>
    );
};

export default FormContacto;
