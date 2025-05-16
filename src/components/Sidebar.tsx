
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  Users,
  FileText,
  BarChart,
  Settings,
  X,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Inventario", path: "/inventory", icon: Package },
  { name: "Clientes", path: "/clients", icon: Users },
  { name: "Facturación", path: "/invoices", icon: FileText },
  { name: "Reportes", path: "/reports", icon: BarChart },
  { name: "Configuración", path: "/settings", icon: Settings },
];

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16",
      )}
    >
      <div className="flex justify-between items-center h-16 px-4 border-b">
        <h2 
          className={cn(
            "font-bold text-xl text-primary transition-all duration-300 flex items-center gap-2",
            isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
          )}
        >
          <span className="text-primary">Factura</span>
          <span className="text-foreground">DOM</span>
        </h2>
        <Button 
          onClick={() => setIsOpen(false)} 
          variant="ghost" 
          size="icon"
          className={cn("md:hidden", isOpen ? "flex" : "hidden")}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="p-2 space-y-1">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-foreground hover:bg-muted",
                      !isOpen && "justify-center md:justify-center"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 transition-transform", 
                      isActive ? "text-primary" : "text-muted-foreground",
                      !isOpen && "transform-gpu scale-110"
                    )} />
                    {isOpen && (
                      <span 
                        className={cn(
                          "ml-3 transition-opacity duration-300",
                          isActive ? "opacity-100 font-medium" : "opacity-80"
                        )}
                      >
                        {item.name}
                      </span>
                    )}
                  </Link>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
      
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center px-4 py-3 rounded-lg mt-auto mb-4 text-destructive hover:bg-destructive/10",
                !isOpen && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {isOpen && <span className="ml-3">Cerrar Sesión</span>}
            </Button>
          </TooltipTrigger>
          {!isOpen && (
            <TooltipContent side="right">
              Cerrar Sesión
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      
      <div className={cn(
        "mb-4 px-4 transition-opacity", 
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="bg-muted/50 rounded-lg p-4 text-center text-sm">
          <p className="text-muted-foreground">Sistema de Facturación</p>
          <p className="text-xs mt-1 text-muted-foreground/70">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};
