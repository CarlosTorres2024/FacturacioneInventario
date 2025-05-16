
import React, { useEffect } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { CreditCard, Package, Users, FileText, AlertTriangle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { useStockAlerts } from "@/hooks/useStockAlerts";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { products, clients, invoices } = useAppContext();
  const { lowStockProducts, noStockProducts, hasAlerts } = useStockAlerts();
  const navigate = useNavigate();

  // Calcular estadísticas
  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  const pendingInvoices = invoices.filter(invoice => invoice.status === "Pendiente").length;
  const lowStockCount = lowStockProducts.length;
  const noStockCount = noStockProducts.length;

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Bienvenido a tu sistema de facturación e inventario
        </p>
      </div>
      
      {hasAlerts && (
        <div className="bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-700 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                Alerta de inventario
              </h4>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                {noStockCount > 0 && (
                  <span className="block">
                    {noStockCount} producto(s) sin stock: {noStockProducts.join(", ")}
                  </span>
                )}
                {lowStockCount > 0 && (
                  <span className="block mt-1">
                    {lowStockCount} producto(s) con bajo stock: {lowStockProducts.join(", ")}
                  </span>
                )}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate("/inventory")}
                className="mt-2 bg-amber-100 border-amber-300 hover:bg-amber-200 dark:bg-amber-800 dark:border-amber-600 dark:hover:bg-amber-700 text-amber-900 dark:text-amber-100"
              >
                Ver inventario
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ingresos Totales"
          value={`RD$${totalRevenue.toLocaleString()}`}
          description={`${invoices.length} facturas totales`}
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          title="Productos"
          value={products.length.toString()}
          description={`${lowStockCount + noStockCount} productos requieren atención`}
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard
          title="Clientes"
          value={clients.length.toString()}
          description="Base de clientes activos"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Facturas"
          value={pendingInvoices.toString()}
          description="Pendientes de pago"
          icon={<FileText className="h-4 w-4" />}
        />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <SalesChart />
        <div className="grid gap-4 lg:col-span-2">
          <InventoryStatus />
        </div>
        <div className="grid gap-4 lg:col-span-3">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
