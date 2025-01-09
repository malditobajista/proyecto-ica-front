import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAlert } from "../../contexts/AlertContext";
import { hasCookie } from "../../utils/cookie";

interface RentalModalProps {
  propertyId: number;
}

const RentalModal: React.FC<RentalModalProps> = ({ propertyId }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { showAlert } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/rent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          propertyId,
          checkIn,
          checkOut,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar la solicitud de alquiler");
      }
      setStatus("success");
      setEmail("");
      setMessage("");
      setCheckIn(null);
      setCheckOut(null);
      showAlert("success", "¡Solicitud enviada correctamente!");
    } catch (error) {
      console.error(error);
      setStatus("error");
      showAlert(
        "error",
        "Ocurrió un error al enviar la solicitud. Intenta de nuevo."
      );
    }
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData && hasCookie("sessionIndicator")) {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full shadowComplete bg-white rounded-lg p-4">
      <h3 className="text-lg text-center font-bold mb-4">Solicita tu alquiler</h3>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-4">
        {!isLogged && (
          <div className="flex-shrink-0">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full border border-black rounded-md shadow-sm p-2"
              placeholder="Escriba su email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex flex-shrink-0">
          <div className="w-1/2 relative">
            <input
              id="checkIn"
              type="date"
              className="block w-full border border-black rounded-l-md shadow-sm p-2 pt-6 peer"
              value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""}
              onChange={(e) => setCheckIn(e.target.valueAsDate)}
              required
            />
            <label
              htmlFor="checkIn"
              className="absolute text-xs font-medium text-gray-500 top-1 left-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs"
            >
              Fecha de entrada
            </label>
          </div>
          <div className="w-1/2 relative">
            <input
              id="checkOut"
              type="date"
              className="block w-full border border-black rounded-r-md shadow-sm p-2 pt-6 peer"
              value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""}
              onChange={(e) => setCheckOut(e.target.valueAsDate)}
              required
            />
            <label
              htmlFor="checkOut"
              className="absolute text-xs font-medium text-gray-500 top-1 left-2 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs"
            >
              Fecha de salida
            </label>
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Mensaje
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full border border-black rounded-md shadow-sm p-2 flex-grow"
            placeholder="Escribe tu consulta aquí"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white font-semibold 
                     py-2 px-4 rounded w-full disabled:opacity-50"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Enviando..." : "Enviar"}
        </button>
      </form>
      {status === "success" && (
        <p className="text-green-600 mt-2">¡Solicitud enviada correctamente!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 mt-2">
          Ocurrió un error al enviar la solicitud. Intenta de nuevo.
        </p>
      )}
    </div>
  );
};

export default RentalModal;

