import React, { useState } from "react";

interface ContactFormProps {
  inRent: boolean; // se usará para enviar al backend
}

const ContactForm: React.FC<ContactFormProps> = ({ inRent }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Cambiamos el estado a "loading" mientras se procesa
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
          inRent, // incluimos la prop inRent
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      // Si la petición fue exitosa
      setStatus("success");

      // Opcional: Reseteamos campos
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div
      className="
        w-full
        rounded
        dark:bg-surface-dark dark:text-gray-800
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
        <input
          className="border border-gray-300 rounded mb-3 p-2 w-full"
          type="email"
          placeholder="Escriba su email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Textarea */}
        <textarea
          className="border border-gray-300 rounded mb-3 p-2 w-full"
          placeholder="Escribe tu consulta aquí"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {/* Botón */}
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold 
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
          Ocurrió un error al enviar los datos. Intenta de nuevo.
        </p>
      )}
    </div>
  );
};

export default ContactForm;
