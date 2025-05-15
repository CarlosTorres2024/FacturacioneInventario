
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { BarChart, AreaChart, PieChart, LineChart } from "recharts";
import {
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Pie,
  Cell,
  Legend,
  Line,
} from "recharts";
import { Download, FileText, Info } from "lucide-react";

const salesData = [
  { name: "Ene", ventas: 4000 },
  { name: "Feb", ventas: 3000 },
  { name: "Mar", ventas: 5000 },
  { name: "Abr", ventas: 2780 },
  { name: "May", ventas: 1890 },
  { name: "Jun", ventas: 2390 },
  { name: "Jul", ventas: 3490 },
];

const categoryData = [
  { name: "Electrónicos", value: 45 },
  { name: "Periféricos", value: 30 },
  { name: "Oficina", value: 25 },
];

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const clientData = [
  { name: "Ene", nuevos: 40, recurrentes: 24 },
  { name: "Feb", nuevos: 30, recurrentes: 28 },
  { name: "Mar", nuevos: 20, recurrentes: 38 },
  { name: "Abr", nuevos: 27, recurrentes: 40 },
  { name: "May", nuevos: 18, recurrentes: 48 },
  { name: "Jun", nuevos: 23, recurrentes: 50 },
  { name: "Jul", nuevos: 34, recurrentes: 52 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Reportes</h2>
        <p className="text-muted-foreground">
          Análisis de ventas, inventario y clientes
        </p>
      </div>
      
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sales">Ventas</TabsTrigger>
          <TabsTrigger value="inventory">Inventario</TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ventas Mensuales</CardTitle>
                <CardDescription>Total de ventas por mes</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Ventas']} />
                    <Bar dataKey="ventas" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Ventas por Categoría</CardTitle>
                  <CardDescription>Distribución del total de ventas</CardDescription>
                </div>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="px-2">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Facturación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Facturas Emitidas
                  </div>
                  <div className="text-3xl font-bold">128</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    +12% vs mes anterior
                  </div>
                </div>
                <div className="bg-green-500/10 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Facturas Pagadas
                  </div>
                  <div className="text-3xl font-bold">112</div>
                  <div className="text-xs text-green-600 mt-1">
                    87.5% del total
                  </div>
                </div>
                <div className="bg-yellow-500/10 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Facturas Pendientes
                  </div>
                  <div className="text-3xl font-bold">16</div>
                  <div className="text-xs text-yellow-600 mt-1">
                    $24,680.00 por cobrar
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estado del Inventario</CardTitle>
              <CardDescription>Productos por categoría y estado de stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Total Productos
                  </div>
                  <div className="text-3xl font-bold">348</div>
                </div>
                <div className="bg-yellow-500/10 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Bajo Stock
                  </div>
                  <div className="text-3xl font-bold">32</div>
                  <div className="text-xs text-yellow-600 mt-1">
                    9.2% del total
                  </div>
                </div>
                <div className="bg-red-500/10 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-1">
                    Sin Stock
                  </div>
                  <div className="text-3xl font-bold">15</div>
                  <div className="text-xs text-red-600 mt-1">
                    4.3% del total
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="font-medium mb-2">Distribución por Categoría</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Electrónicos</span>
                      <span className="font-medium">120 productos</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "34%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">34% del total</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Periféricos</span>
                      <span className="font-medium">145 productos</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">42% del total</div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Equipos de Oficina</span>
                      <span className="font-medium">83 productos</span>
                    </div>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "24%" }}></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">24% del total</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Productos Más Vendidos</CardTitle>
                <CardDescription>
                  Top 5 productos en ventas este mes
                </CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Unidades Vendidas</TableHead>
                    <TableHead className="text-right">Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Laptop HP Pavilion</TableCell>
                    <TableCell>Electrónicos</TableCell>
                    <TableCell className="text-right">24</TableCell>
                    <TableCell className="text-right">$30,000.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Monitor Dell 24"</TableCell>
                    <TableCell>Periféricos</TableCell>
                    <TableCell className="text-right">36</TableCell>
                    <TableCell className="text-right">$11,520.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Impresora Canon</TableCell>
                    <TableCell>Equipos de Oficina</TableCell>
                    <TableCell className="text-right">18</TableCell>
                    <TableCell className="text-right">$5,040.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Teclado Logitech MX</TableCell>
                    <TableCell>Periféricos</TableCell>
                    <TableCell className="text-right">42</TableCell>
                    <TableCell className="text-right">$5,040.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mouse Gaming Razer</TableCell>
                    <TableCell>Periféricos</TableCell>
                    <TableCell className="text-right">38</TableCell>
                    <TableCell className="text-right">$3,610.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Clientes</CardTitle>
              <CardDescription>Clientes nuevos vs recurrentes</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="nuevos"
                    stroke="#8884d8"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="recurrentes"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Principales</CardTitle>
                <CardDescription>Top 5 por volumen de compras</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="text-right">Compras</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Empresa Tecnología S.A.</TableCell>
                      <TableCell className="text-right">$45,600.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Distribuidora Industrial</TableCell>
                      <TableCell className="text-right">$28,900.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Boutique Elegancia</TableCell>
                      <TableCell className="text-right">$35,700.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ferretería Construcción</TableCell>
                      <TableCell className="text-right">$19,800.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cafetería El Grano</TableCell>
                      <TableCell className="text-right">$12,400.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Retención de Clientes</CardTitle>
                <CardDescription>Análisis de fidelidad</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col items-center justify-center p-4 border rounded-md">
                    <div className="text-5xl font-bold text-primary">78%</div>
                    <div className="mt-2 text-sm text-center text-muted-foreground">
                      Tasa de retención de clientes
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Clientes Nuevos</span>
                        <span>22%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Clientes Recurrentes</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    El 78% de los clientes han realizado más de una compra en los últimos 6 meses.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Exportar Reportes</CardTitle>
          <CardDescription>
            Descarga los reportes en diferentes formatos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 mb-2" />
                <span>Reporte de Ventas (PDF)</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 mb-2" />
                <span>Reporte de Inventario (Excel)</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4">
              <div className="flex flex-col items-center">
                <FileText className="h-6 w-6 mb-2" />
                <span>Reporte de Clientes (CSV)</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
