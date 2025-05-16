
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { FileText, Download, BarChart3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const Reports = () => {
  const { products, clients, invoices } = useAppContext();
  const [activeTab, setActiveTab] = useState("sales");

  const handleExportCsv = (reportType: string) => {
    let data: any[] = [];
    let filename = "";
    let headers: string[] = [];

    if (reportType === "sales") {
      data = invoices.map(invoice => ({
        id: invoice.id,
        cliente: invoice.client,
        fecha: invoice.date,
        total: invoice.total,
        estado: invoice.status
      }));
      headers = ["ID", "Cliente", "Fecha", "Total", "Estado"];
      filename = "reporte-ventas.csv";
    } else if (reportType === "inventory") {
      data = products.map(product => ({
        id: product.id,
        nombre: product.name,
        categoria: product.category,
        stock: product.stock,
        precio: product.price,
        estado: product.status
      }));
      headers = ["ID", "Nombre", "Categoría", "Stock", "Precio", "Estado"];
      filename = "reporte-inventario.csv";
    } else if (reportType === "clients") {
      data = clients.map(client => ({
        id: client.id,
        nombre: client.name,
        email: client.email,
        telefono: client.phone,
        direccion: client.address,
        compras: client.totalPurchases
      }));
      headers = ["ID", "Nombre", "Email", "Teléfono", "Dirección", "Compras Totales"];
      filename = "reporte-clientes.csv";
    }

    if (data.length === 0) {
      return;
    }

    // Crear contenido CSV
    const csvContent = [
      headers.join(","),
      ...data.map(row => Object.values(row).join(","))
    ].join("\n");

    // Crear y descargar archivo
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preparar datos para gráficos
  const prepareChartData = () => {
    // Agrupar ventas por mes
    const salesByMonth: {[key: string]: number} = {};
    
    invoices.forEach(invoice => {
      const date = new Date(invoice.date);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (salesByMonth[monthYear]) {
        salesByMonth[monthYear] += invoice.total;
      } else {
        salesByMonth[monthYear] = invoice.total;
      }
    });
    
    return Object.keys(salesByMonth).map(month => ({
      month,
      total: salesByMonth[month]
    }));
  };

  // Datos para el gráfico de categorías
  const prepareCategoryData = () => {
    const categoryCounts: {[key: string]: number} = {};
    
    products.forEach(product => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });
    
    return Object.keys(categoryCounts).map(category => ({
      name: category,
      count: categoryCounts[category]
    }));
  };

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reportes</h2>
        <p className="text-muted-foreground">
          Genera y visualiza reportes de tu negocio
        </p>
      </div>
      
      <Tabs 
        defaultValue="sales" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Ventas</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Inventario</span>
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Clientes</span>
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Gráficos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Reporte de Ventas</CardTitle>
                  <CardDescription>
                    {invoices.length} facturas registradas
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => handleExportCsv("sales")}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar CSV</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {invoices.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">ID</th>
                        <th className="text-left p-3">Cliente</th>
                        <th className="text-left p-3">Fecha</th>
                        <th className="text-right p-3">Total</th>
                        <th className="text-right p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map(invoice => (
                        <tr key={invoice.id} className="border-t hover:bg-muted/50">
                          <td className="p-3">{invoice.id}</td>
                          <td className="p-3">{invoice.client}</td>
                          <td className="p-3">{invoice.date}</td>
                          <td className="p-3 text-right">RD${invoice.total.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-1 rounded text-xs ${
                              invoice.status === "Pagada" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                                : invoice.status === "Pendiente" 
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" 
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No hay facturas registradas
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Reporte de Inventario</CardTitle>
                  <CardDescription>
                    {products.length} productos registrados
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => handleExportCsv("inventory")}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar CSV</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {products.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">ID</th>
                        <th className="text-left p-3">Nombre</th>
                        <th className="text-left p-3">Categoría</th>
                        <th className="text-right p-3">Stock</th>
                        <th className="text-right p-3">Precio</th>
                        <th className="text-right p-3">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-t hover:bg-muted/50">
                          <td className="p-3">{product.id}</td>
                          <td className="p-3">{product.name}</td>
                          <td className="p-3">{product.category}</td>
                          <td className="p-3 text-right">{product.stock}</td>
                          <td className="p-3 text-right">RD${product.price.toFixed(2)}</td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-1 rounded text-xs ${
                              product.status === "Disponible" 
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" 
                                : product.status === "Bajo Stock" 
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" 
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }`}>
                              {product.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No hay productos registrados
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Reporte de Clientes</CardTitle>
                  <CardDescription>
                    {clients.length} clientes registrados
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => handleExportCsv("clients")}
                  className="flex items-center gap-2 md:self-end"
                >
                  <Download className="h-4 w-4" />
                  <span>Exportar CSV</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {clients.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3">ID</th>
                        <th className="text-left p-3">Nombre</th>
                        <th className="text-left p-3">Email</th>
                        <th className="text-left p-3">Teléfono</th>
                        <th className="text-right p-3">Compras Totales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map(client => (
                        <tr key={client.id} className="border-t hover:bg-muted/50">
                          <td className="p-3">{client.id}</td>
                          <td className="p-3">{client.name}</td>
                          <td className="p-3">{client.email}</td>
                          <td className="p-3">{client.phone}</td>
                          <td className="p-3 text-right">RD${client.totalPurchases.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  No hay clientes registrados
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventas por Mes</CardTitle>
                <CardDescription>
                  Total de ventas agrupadas por mes
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {invoices.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={prepareChartData()} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`RD$${Number(value).toFixed(2)}`, 'Total']} />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" name="Ventas" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No hay datos suficientes para generar el gráfico
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Productos por Categoría</CardTitle>
                <CardDescription>
                  Distribución de productos por categoría
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {products.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={prepareCategoryData()} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#82ca9d" name="Cantidad" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    No hay datos suficientes para generar el gráfico
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
