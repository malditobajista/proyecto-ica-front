import axios from "axios";
import { SendEmail } from "../../utils/types";

const BASE_URL = "http://localhost:3000";

export const sendEmail = async (body: SendEmail) => {
    try {
      const response = await axios.post(`${BASE_URL}/mail/send`, body);
  
      const home = response.data;
      console.log("fetchHomeClient response", home);
      return home;
    }catch(error){
      console.error("Error al cargar las propiedades:", error);
      return {rent: [], sale: [], pinned: []};
    }
  }