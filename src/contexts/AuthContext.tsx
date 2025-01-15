import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers, logoutUser } from "../services/users/userService";
import { UserData } from "../utils/types";

interface AuthContextProps {
  user: UserData | null;
  isAuthenticated: boolean;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  // Llamada para obtener el perfil del usuario:
  const fetchUserProfile = async () => {
    try {
      const userData = await getUsers();
      sessionStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);

      // Evitar logout repetitivo si el usuario ya está en login:
      if (window.location.pathname !== "/login") {
        // Si necesitamos redirigir a login:
        handleLogout();
      }
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    sessionStorage.removeItem("userData");
    setUser(null);
    // Si quieres forzar redirect a login:
    // window.location.href = "/login";
  };

  useEffect(() => {
    // Este effect solo se ejecuta una vez, al montar el AuthProvider.
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        logoutUser: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
