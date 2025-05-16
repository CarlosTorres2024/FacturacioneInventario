
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  role: "admin" | "supervisor" | "cajero";
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthorized: () => boolean;
}

// Usuarios predefinidos para demo
const DEMO_USERS = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    username: "supervisor",
    email: "supervisor@example.com",
    password: "super123",
    role: "supervisor" as const,
  },
  {
    id: "3",
    username: "cajero",
    email: "cajero@example.com",
    password: "cajero123",
    role: "cajero" as const,
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario de localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("currentUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulación de autenticación
    const foundUser = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${userWithoutPassword.username}!`,
      });
      return true;
    } else {
      toast({
        title: "Error de autenticación",
        description: "Correo electrónico o contraseña incorrectos",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
  };

  const isAuthorized = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
