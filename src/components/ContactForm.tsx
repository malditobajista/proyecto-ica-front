import React, { useState } from 'react';
import Button from './Button';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para manejar el envío de datos
    };

    return (
        <section id="contact-form" className="p-4 max-w-lg mx-auto">
            <form
                className="space-y-4"
                method="post"
                action="https://www.inmobiliariacostaazul.com/wp-admin/admin-ajax.php"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-semibold">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        placeholder="Tu Nombre"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        placeholder="Tu Correo Electrónico"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="number" className="text-sm font-semibold">Teléfono</label>
                    <input
                        type="text"
                        name="number"
                        id="number"
                        value={formData.number}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        placeholder="Tu Teléfono"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message" className="text-sm font-semibold">Mensaje</label>
                    <textarea
                        name="message"
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded-md"
                        placeholder="Tu Mensaje"
                        rows={6}
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <div className="g-recaptcha" data-sitekey="your-site-key"></div>
                </div>

                <Button
                    type="submit"
                    clase="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Enviar
                </Button>
            </form>

            <div id="error-container" className="text-red-500"></div>
            <div id="message-container" className="text-green-500"></div>
        </section>
    );
};

export default ContactForm;
