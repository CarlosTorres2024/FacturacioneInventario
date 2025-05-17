
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type UserRole = "admin" | "supervisor" | "cajero";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  session: Session | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthorized: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener el rol del usuario desde la tabla user_roles
  const getUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error("Error obteniendo el rol del usuario:", error);
        return null;
      }

      return data?.role as UserRole | null;
    } catch (error) {
      console.error("Error inesperado obteniendo el rol:", error);
      return null;
    }
  };

  // Función para actualizar el estado del usuario
  const updateUserState = async (session: Session | null) => {
    if (!session) {
      setUser(null);
      return;
    }

    const supabaseUser = session.user;

    // Obtener el rol del usuario desde la tabla user_roles
    if (supabaseUser) {
      try {
        // Usar setTimeout para evitar deadlocks en el callback de onAuthStateChange
        setTimeout(async () => {
          const role = await getUserRole(supabaseUser.id);

          // Crear objeto de usuario para el estado
          const authUser: AuthUser = {
            id: supabaseUser.id,
            username: supabaseUser.email?.split('@')[0] || "",
            email: supabaseUser.email || "",
            role: role
          };

          setUser(authUser);
          setLoading(false);
        }, 0);
      } catch (error) {
        console.error("Error actualizando el estado del usuario:", error);
        setUser(null);
        setLoading(false);
      }
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  // Inicializar y escuchar cambios en la autenticación
  useEffect(() => {
    // Configurar primero el listener de cambios de estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state change event:", event);
        setSession(currentSession);
        
        // Solo actualizar el estado del usuario de forma sincrónica
        if (!currentSession) {
          setUser(null);
        }
        // La obtención de rol se hará de forma asíncrona en updateUserState
        updateUserState(currentSession);
      }
    );

    // Verificar si ya hay una sesión activa
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Initial session:", currentSession);
        setSession(currentSession);
        
        if (currentSession) {
          await updateUserState(currentSession);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error inicializando la autenticación:", error);
        setLoading(false);
      }
    };

    initializeAuth();

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Error de autenticación",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      if (data.session) {
        // La sesión se actualizará a través del listener onAuthStateChange
        toast({
          title: "Inicio de sesión exitoso",
          description: `¡Bienvenido de nuevo!`,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error de login:", error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error al intentar iniciar sesión",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión correctamente",
        variant: "destructive",
      });
    }
  };

  const isAuthorized = () => {
    return !!session && !!user;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, login, logout, isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
