import React, { useEffect, useState } from "react";
import { hasCookie } from "../../utils/cookie";

interface ContactFormProps {
  propertyId: number;
}

const ContactForm: React.FC<ContactFormProps> = ({ propertyId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          propertyId
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData && hasCookie("sessionIndicator")) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div
      className="
        w-full
        rounded
        dark:bg-surface-dark dark:text-gray-800
shadowComplete
        p-4
        mb-4
"
    >
      <h3 className="text-lg text-center font-bold mb-2">Contáctanos</h3>
      <p className="text-sm mb-3">
        Déjanos tu mensaje y te contactaremos a la brevedad.
      </p>

      {/* Form para enviar datos */}
      <form onSubmit={handleSubmit}>
      {!isLogged && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 mb-2 block w-full border border-black rounded-md shadow-sm p-2"
                placeholder="Escriba su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

        {/* Textarea */}
        <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              className="mb-2 block w-full border border-black rounded-md shadow-sm p-2"
              rows={4}
              placeholder="Escribe tu consulta aquí"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

        {/* Botón */}
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white font-semibold 
                     py-2 px-4 rounded w-full disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {/* Muestra un mensaje según el estado */}
      {status === "success" && (
        <p className="text-green-600 mt-2">¡Enviado correctamente!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">
          Ocurrió un error al enviar los datos.
        </p>
      )}
    </div>
  );
};

export default ContactForm;