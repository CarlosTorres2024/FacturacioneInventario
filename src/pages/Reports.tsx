
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FileSpreadsheet,
  FilePdf,
  Calendar,
  CreditCard,
  Package,
  Users,
  Download,
  List,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";

const Reports = () => {
  const [reportType, setReportType] = useState("sales");
  const [timeRange, setTimeRange] = useState("month");
  const [exportFormat, setExportFormat] = useState("excel");
  
  const { products, clients, invoices } = useAppContext();
  
  const handleExport = () => {
    // Simulación de exportación
    toast({
      title: "Exportando reporte",
      description: `Preparando reporte de ${getReportName()} en formato ${exportFormat.toUpperCase()}`,
    });
    
    setTimeout(() => {
      toast({
        title: "Reporte generado",
        description: `El reporte de ${getReportName()} ha sido generado correctamente.`,
      });
    }, 1500);
  };
  
  const getReportName = () => {
    const reportNames: {[key: string]: string} = {
      "sales": "ventas",
      "inventory": "inventario",
      "clients": "clientes",
      "finances": "finanzas"
    };
    
    return reportNames[reportType] || reportType;
  };
  
  const getExportIcon = () => {
    switch (exportFormat) {
      case "excel":
        return <FileSpreadsheet className="h-4 w-4" />;
      case "pdf":
        return <FilePdf className="h-4 w-4" />;
      case "csv":
        return <FileText className="h-4 w-4" />;
      default:
        return <Download className="h-4 w-4" />;
    }
  };
  
  const renderContent = () => {
    switch (reportType) {
      case "sales":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Facturas emitidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{invoices.length}</div>
                  <p className="text-muted-foreground text-sm">Total de documentos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ventas realizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {invoices.reduce((sum, inv) => sum + inv.total, 0).toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Monto total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Promedio por factura</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {invoices.length > 0 
                      ? (invoices.reduce((sum, inv) => sum + inv.total, 0) / invoices.length).toFixed(2) 
                      : "0.00"}
                  </div>
                  <p className="text-muted-foreground text-sm">Valor medio</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-lg p-6 bg-muted/20">
              <div className="flex items-center justify-center h-52">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <p>El reporte de ventas será generado al exportar</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "inventory":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total productos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{products.length}</div>
                  <p className="text-muted-foreground text-sm">En inventario</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Valor de inventario</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {products.reduce((sum, prod) => sum + (prod.price * prod.stock), 0).toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Valor total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Bajo stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {products.filter(p => p.status === "Bajo Stock" || p.status === "Sin Stock").length}
                  </div>
                  <p className="text-muted-foreground text-sm">Productos para reordenar</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-lg p-6 bg-muted/20">
              <div className="flex items-center justify-center h-52">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-12 w-12 mx-auto mb-2" />
                  <p>El reporte de inventario será generado al exportar</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "clients":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{clients.length}</div>
                  <p className="text-muted-foreground text-sm">Registrados en sistema</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Compras acumuladas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {clients.reduce((sum, client) => sum + client.totalPurchases, 0).toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Total histórico</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Promedio por cliente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {clients.length > 0 
                      ? (clients.reduce((sum, client) => sum + client.totalPurchases, 0) / clients.length).toFixed(2) 
                      : "0.00"}
                  </div>
                  <p className="text-muted-foreground text-sm">Valor medio</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-lg p-6 bg-muted/20">
              <div className="flex items-center justify-center h-52">
                <div className="text-center text-muted-foreground">
                  <List className="h-12 w-12 mx-auto mb-2" />
                  <p>El reporte de clientes será generado al exportar</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "finances":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ingresos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {invoices
                      .filter(inv => inv.status === "Pagada")
                      .reduce((sum, inv) => sum + inv.total, 0)
                      .toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Facturas pagadas</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Pendiente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    RD$ {invoices
                      .filter(inv => inv.status === "Pendiente")
                      .reduce((sum, inv) => sum + inv.total, 0)
                      .toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm">Por cobrar</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Facturas canceladas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {invoices.filter(inv => inv.status === "Cancelada").length}
                  </div>
                  <p className="text-muted-foreground text-sm">Anuladas</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="border rounded-lg p-6 bg-muted/20">
              <div className="flex items-center justify-center h-52">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-2" />
                  <p>El reporte financiero será generado al exportar</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reportes</h2>
        <p className="text-muted-foreground">
          Genera y exporta reportes de tu negocio
        </p>
      </div>
      
      <div className="flex flex-col space-y-4">
        <Tabs defaultValue="sales" value={reportType} onValueChange={setReportType}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <TabsList>
              <TabsTrigger value="sales" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" /> 
                <span className="hidden md:inline">Ventas</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center gap-2">
                <Package className="h-4 w-4" /> 
                <span className="hidden md:inline">Inventario</span>
              </TabsTrigger>
              <TabsTrigger value="clients" className="flex items-center gap-2">
                <Users className="h-4 w-4" /> 
                <span className="hidden md:inline">Clientes</span>
              </TabsTrigger>
              <TabsTrigger value="finances" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" /> 
                <span className="hidden md:inline">Finanzas</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-2">
              <div className="w-full md:w-auto">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-full md:w-40">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <SelectValue placeholder="Periodo" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="week">Esta semana</SelectItem>
                    <SelectItem value="month">Este mes</SelectItem>
                    <SelectItem value="quarter">Este trimestre</SelectItem>
                    <SelectItem value="year">Este año</SelectItem>
                    <SelectItem value="all">Todo el tiempo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full md:w-auto">
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger className="w-full md:w-40">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <SelectValue placeholder="Formato" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleExport} className="w-full md:w-auto gap-2">
                {getExportIcon()}
                <span>Exportar</span>
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <TabsContent value="sales" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Ventas</CardTitle>
                  <CardDescription>
                    Analiza las ventas realizadas en el periodo seleccionado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderContent()}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inventory" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Inventario</CardTitle>
                  <CardDescription>
                    Analiza el estado actual del inventario y la rotación de productos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderContent()}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="clients" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reporte de Clientes</CardTitle>
                  <CardDescription>
                    Analiza los clientes y sus compras en el periodo seleccionado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderContent()}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="finances" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Reporte Financiero</CardTitle>
                  <CardDescription>
                    Analiza las finanzas y flujo de caja en el periodo seleccionado
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderContent()}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
