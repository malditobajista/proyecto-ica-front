import { ChangePassword, UserData } from "../../utils/types";

const BASE_URL = "http://localhost:3000";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (res.status !== 200) throw new Error('Error get users');
  const data = await res.json();
  return data;
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

export async function loginUser(email:string, password:string) {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user:{ email, password }}),
  });
  if (res.status !== 200) throw new Error('Error login');
  return res;
}

export async function updateUser(userData: UserData) {
  const res = await fetch(`${BASE_URL}/user/update`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({user:{ ...userData }}),
  });
  console.log('res',res);
  if (res.status !== 200) throw new Error('Error update');
  return res;
}

export async function changePassword( passwordData: ChangePassword) {
  console.log('passwordData',passwordData);
  const res = await fetch(`${BASE_URL}/user/changePassword`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...passwordData}),
  });
  console.log('res',res);
  if (res.status !== 200) throw new Error('Error cambio de contraseña');
  return res;
}

export const registerUser = async (userData: UserData) => {
  const endpoint = "user/create";
  const dataToSend = { user: { ...userData } };
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  if (res.status !== 200) throw new Error("Error register");
  return res;
};

export const logoutUser = async () => {
  const res = await fetch(`${BASE_URL}/user/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('res',res);
  if (res.status !== 200) throw new Error('Error logout');
}


