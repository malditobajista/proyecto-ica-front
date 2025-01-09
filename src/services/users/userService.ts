import { ChangePassword, UserData } from "../../utils/types";

const BASE_URL = "http://localhost:3000";

export const getUsers = async () => {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (res.status === 401) {
    await logoutUser();
    window.location.href = "/login";
  }
  if (res.status !== 200) throw new Error('Error get users');
  const data = await res.json();
  return data;
};

export const forgotPassword = async (email: string) => {
  const res = await fetch(`${BASE_URL}/user/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  console.log('res',res);
  if (!res.ok) {
    throw new Error('No se pudo enviar el correo. Verifica tu email o intenta nuevamente.');
  }
};


export const resetPassword = async (token: string, newPassword: string) => {
  const res = await fetch(`${BASE_URL}/user/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!res.ok) {
    throw new Error('No se pudo restablecer la contraseña. Intenta nuevamente.');
  }
};

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
  if (res.status === 401) {
    await logoutUser();
    window.location.href = "/login";
  }
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
  if (res.status === 401) {
    await logoutUser();
    window.location.href = "/login";
  }
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


