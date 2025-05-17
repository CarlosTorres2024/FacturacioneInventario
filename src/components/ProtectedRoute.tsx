
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "supervisor" | "cajero")[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles 
}) => {
  const { isAuthorized, loading, user } = useAuth();

  // Mostrar indicador de carga mientras se verifica la autenticación
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Verificar si el usuario está autenticado
  if (!isAuthorized()) {
    console.log("Usuario no autenticado, redirigiendo a /login");
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene el rol permitido
  if (allowedRoles && user?.role) {
    if (!allowedRoles.includes(user.role)) {
      toast({
        title: "Acceso denegado",
        description: "No tienes permiso para acceder a esta página",
        variant: "destructive",
      });
      console.log(`Acceso denegado para rol ${user.role}, redirigiendo a /`);
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};
