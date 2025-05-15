
import React from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { CreditCard, Package, Users, FileText } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Bienvenido a tu sistema de facturación e inventario
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Ingresos Totales"
          value="$24,580.00"
          description="+20.1% desde el mes pasado"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <StatCard
          title="Productos"
          value="348"
          description="32 productos con stock bajo"
          icon={<Package className="h-4 w-4" />}
        />
        <StatCard
          title="Clientes"
          value="583"
          description="12 nuevos este mes"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Facturas"
          value="129"
          description="8 pendientes de pago"
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
