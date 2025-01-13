import axios from "axios";
import { SendEmail } from "../../utils/types";

const BASE_URL = "http://localhost:3000";

export const sendEmail = async (body: SendEmail) => {
    try {
      const response = await axios.post(`${BASE_URL}/mail/consultation`, body);
      const home = response.data;
      return home;
    }catch {
      throw new Error("Error al enviar el email");
    }
  }