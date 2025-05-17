
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "supervisor" | "cajero")[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthorized, loading, user } = useAuth();

  // Si está cargando, mostramos un indicador de carga
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirigir a login si no está autenticado
  if (!isAuthorized()) {
    return <Navigate to="/login" replace />;
  }

  // Verificar el rol si se especifica
  if (allowedRoles && user && user.role) {
    if (!allowedRoles.includes(user.role)) {
      // Si el usuario no tiene un rol permitido, redirigir a una página de acceso denegado o dashboard
      toast({
        title: "Acceso denegado",
        description: "No tienes permiso para acceder a esta página",
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

// Importación necesaria para los toasts
import { toast } from "@/hooks/use-toast";
