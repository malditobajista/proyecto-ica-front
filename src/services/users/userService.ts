import { get, post } from "../api";
import { UserData } from "../../utils/types";

export const getUsers = async () => {
  return await get("/users");
};

// export const createUser = async (userData: UserData) => {
//   return await post<UserData>("/users", userData);
// };

// export const handleLogin = async (email: string, password: string) => {
//   try {
//     const url = "http://test2.inmobiliariacostaazul.com/user/login";
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ user: { email, password } }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log("Login exitoso:", data);
//     return data;
//   } catch (error) {
//     console.error("Error en el login:", error);
//     throw error;
//   }

// };

export const loginUser = async (email: string, password: string) => {
  const endpoint = "user/login";
  const userData = { user: { email, password } };
  return await post<typeof userData>(endpoint, userData);
};

export const registerUser = async (userData: UserData) => {
  const endpoint = "user/create";
  const dataToSend = { user: { ...userData } };
  return await post<typeof dataToSend>(endpoint, dataToSend);
};

