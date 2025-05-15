import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Gestiona las configuraciones de tu sistema
        </p>
      </div>
      
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="company">Empresa</TabsTrigger>
          <TabsTrigger value="invoice">Facturación</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Datos generales que aparecerán en las facturas y reportes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input id="companyName" defaultValue="Mi Empresa S.A. de C.V." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">RFC</Label>
                  <Input id="taxId" defaultValue="XAXX010101000" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue="Av. Principal #123, Col. Centro, Ciudad de México" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" defaultValue="55 1234 5678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" defaultValue="contacto@miempresa.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Sitio Web</Label>
                  <Input id="website" defaultValue="www.miempresa.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Logotipo</CardTitle>
              <CardDescription>
                Personaliza la imagen de tu empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-32 h-32 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">Sin logo</span>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline">Subir Logotipo</Button>
                  <p className="text-sm text-muted-foreground">
                    Formatos permitidos: PNG, JPG, SVG. Máximo 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Facturas</CardTitle>
              <CardDescription>
                Personaliza los ajustes relacionados con la facturación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="invoicePrefix">Prefijo de Factura</Label>
                  <Input id="invoicePrefix" defaultValue="INV-" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextInvoiceNumber">Próximo Número de Factura</Label>
                  <Input id="nextInvoiceNumber" type="number" defaultValue="1025" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="termsAndConditions">Términos y Condiciones</Label>
                <textarea
                  id="termsAndConditions"
                  className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background text-sm"
                  defaultValue="El pago debe realizarse dentro de los 30 días posteriores a la emisión de la factura. Aplican intereses por pagos tardíos."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tasa de Impuesto (IVA %)</Label>
                  <Input id="taxRate" type="number" defaultValue="16" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Moneda</Label>
                  <select id="currency" className="w-full p-2 rounded-md border border-input bg-background">
                    <option value="MXN">Peso Mexicano (MXN)</option>
                    <option value="USD">Dólar Estadounidense (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Opciones de Pago</CardTitle>
              <CardDescription>
                Configura los métodos de pago aceptados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cashPayments">Pagos en Efectivo</Label>
                    <p className="text-sm text-muted-foreground">Aceptar pagos en efectivo</p>
                  </div>
                  <Switch id="cashPayments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transferPayments">Transferencia Bancaria</Label>
                    <p className="text-sm text-muted-foreground">Aceptar pagos por transferencia</p>
                  </div>
                  <Switch id="transferPayments" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="cardPayments">Tarjeta de Crédito/Débito</Label>
                    <p className="text-sm text-muted-foreground">Aceptar pagos con tarjeta</p>
                  </div>
                  <Switch id="cardPayments" defaultChecked />
                </div>
                
                <div className="pt-2 mt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="bankAccount">Cuenta Bancaria para Transferencias</Label>
                    <Input id="bankAccount" defaultValue="BANCO EJEMPLO - 012345678901234567" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias del Sistema</CardTitle>
              <CardDescription>
                Personaliza el comportamiento general del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="lowStockAlerts">Alertas de Bajo Stock</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar notificaciones cuando el stock esté por debajo del umbral
                    </p>
                  </div>
                  <Switch id="lowStockAlerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoBackup">Copia de Seguridad Automática</Label>
                    <p className="text-sm text-muted-foreground">
                      Realizar copias de seguridad diarias de los datos
                    </p>
                  </div>
                  <Switch id="autoBackup" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="invoiceReminders">Recordatorios de Facturación</Label>
                    <p className="text-sm text-muted-foreground">
                      Enviar recordatorios para facturas pendientes
                    </p>
                  </div>
                  <Switch id="invoiceReminders" defaultChecked />
                </div>
                
                <div className="pt-2 mt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma del Sistema</Label>
                    <select id="language" className="w-full p-2 rounded-md border border-input bg-background">
                      <option value="es">Español</option>
                      <option value="en">Inglés</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usuarios y Permisos</CardTitle>
              <CardDescription>
                Administra los usuarios que pueden acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <div className="text-sm font-medium mb-2">Usuarios Activos</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Administrador</p>
                      <p className="text-sm text-muted-foreground">admin@miempresa.com</p>
                    </div>
                    <Badge>Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">Juan Pérez</p>
                      <p className="text-sm text-muted-foreground">juan@miempresa.com</p>
                    </div>
                    <Badge variant="secondary">Ventas</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="font-medium">María García</p>
                      <p className="text-sm text-muted-foreground">maria@miempresa.com</p>
                    </div>
                    <Badge variant="secondary">Inventario</Badge>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Agregar Usuario
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
