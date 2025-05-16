
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { UserCog, Building, FileText, Settings as SettingsIcon, Trash2, RefreshCcw, Save, Globe } from "lucide-react";

const Settings = () => {
  const { resetDatabase } = useAppContext();
  
  const [companyInfo, setCompanyInfo] = useState({
    name: "Mi Empresa",
    rnc: "000-0000000-0",
    address: "Calle Principal #123, Santo Domingo, República Dominicana",
    phone: "(809) 555-1234",
    email: "contacto@miempresa.com",
    website: "www.miempresa.com",
    ncfPrefix: "B01"
  });

  const [fiscalSettings, setFiscalSettings] = useState({
    enableNCF: true,
    enableElectronicInvoice: false,
    sequentialNumbering: true,
    automaticITBIS: true,
    itbisRate: 18,
    includeTaxInPrice: false
  });

  const [systemSettings, setSystemSettings] = useState({
    autoDarkMode: true,
    soundNotifications: true,
    stockAlerts: true,
    lowStockThreshold: 5,
    backupFrequency: "daily"
  });

  const handleSaveCompanyInfo = () => {
    localStorage.setItem("companyInfo", JSON.stringify(companyInfo));
    toast({
      title: "Información guardada",
      description: "Los datos de la empresa han sido actualizados."
    });
  };

  const handleSaveFiscalSettings = () => {
    localStorage.setItem("fiscalSettings", JSON.stringify(fiscalSettings));
    toast({
      title: "Configuración guardada",
      description: "La configuración fiscal ha sido actualizada."
    });
  };

  const handleSaveSystemSettings = () => {
    localStorage.setItem("systemSettings", JSON.stringify(systemSettings));
    toast({
      title: "Configuración guardada",
      description: "La configuración del sistema ha sido actualizada."
    });
  };

  const handleReset = () => {
    resetDatabase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
        <p className="text-muted-foreground">
          Administra la configuración de tu sistema
        </p>
      </div>
      
      <Tabs defaultValue="company">
        <TabsList className="mb-4">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="h-4 w-4" /> <span>Empresa</span>
          </TabsTrigger>
          <TabsTrigger value="fiscal" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> <span>Fiscal</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" /> <span>Sistema</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UserCog className="h-4 w-4" /> <span>Usuarios</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
              <CardDescription>
                Configura los datos de tu empresa que aparecerán en las facturas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input 
                    id="company-name" 
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-rnc">RNC</Label>
                  <Input 
                    id="company-rnc" 
                    value={companyInfo.rnc}
                    onChange={(e) => setCompanyInfo({...companyInfo, rnc: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-ncf">Prefijo NCF</Label>
                  <Input 
                    id="company-ncf" 
                    value={companyInfo.ncfPrefix}
                    onChange={(e) => setCompanyInfo({...companyInfo, ncfPrefix: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Teléfono</Label>
                  <Input 
                    id="company-phone" 
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input 
                    id="company-email" 
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-website">Sitio Web</Label>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="company-website" 
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company-address">Dirección</Label>
                  <Textarea 
                    id="company-address" 
                    className="min-h-24"
                    value={companyInfo.address}
                    onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="gap-2"
                onClick={handleSaveCompanyInfo}
              >
                <Save className="h-4 w-4" /> Guardar Información
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="fiscal">
          <Card>
            <CardHeader>
              <CardTitle>Configuración Fiscal</CardTitle>
              <CardDescription>
                Configura los parámetros fiscales para la emisión de facturas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="enable-ncf" className="text-base">Habilitar NCF</Label>
                  <p className="text-sm text-muted-foreground">
                    Emite facturas con Número de Comprobante Fiscal (NCF)
                  </p>
                </div>
                <Switch 
                  id="enable-ncf"
                  checked={fiscalSettings.enableNCF}
                  onCheckedChange={(checked) => setFiscalSettings({...fiscalSettings, enableNCF: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="enable-electronic" className="text-base">Facturación Electrónica</Label>
                  <p className="text-sm text-muted-foreground">
                    Emite facturas electrónicas según normativa DGII
                  </p>
                </div>
                <Switch 
                  id="enable-electronic"
                  checked={fiscalSettings.enableElectronicInvoice}
                  onCheckedChange={(checked) => setFiscalSettings({...fiscalSettings, enableElectronicInvoice: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="sequential-numbering" className="text-base">Numeración Secuencial</Label>
                  <p className="text-sm text-muted-foreground">
                    Asigna numeración consecutiva a todas las facturas
                  </p>
                </div>
                <Switch 
                  id="sequential-numbering"
                  checked={fiscalSettings.sequentialNumbering}
                  onCheckedChange={(checked) => setFiscalSettings({...fiscalSettings, sequentialNumbering: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="auto-itbis" className="text-base">ITBIS Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Calcula automáticamente el ITBIS en las facturas
                  </p>
                </div>
                <Switch 
                  id="auto-itbis"
                  checked={fiscalSettings.automaticITBIS}
                  onCheckedChange={(checked) => setFiscalSettings({...fiscalSettings, automaticITBIS: checked})}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label htmlFor="itbis-rate">Porcentaje ITBIS (%)</Label>
                  <Input 
                    id="itbis-rate" 
                    type="number"
                    value={fiscalSettings.itbisRate}
                    onChange={(e) => setFiscalSettings({...fiscalSettings, itbisRate: Number(e.target.value)})}
                    disabled={!fiscalSettings.automaticITBIS}
                  />
                </div>
                
                <div className="flex items-center h-full pt-8">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="include-tax"
                      checked={fiscalSettings.includeTaxInPrice}
                      onCheckedChange={(checked) => setFiscalSettings({...fiscalSettings, includeTaxInPrice: checked})}
                      disabled={!fiscalSettings.automaticITBIS}
                    />
                    <Label htmlFor="include-tax">Precios incluyen ITBIS</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="gap-2"
                onClick={handleSaveFiscalSettings}
              >
                <Save className="h-4 w-4" /> Guardar Configuración
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>
                Personaliza el comportamiento general del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="auto-dark" className="text-base">Modo oscuro automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Cambiar al modo oscuro según la configuración del sistema
                  </p>
                </div>
                <Switch 
                  id="auto-dark"
                  checked={systemSettings.autoDarkMode}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoDarkMode: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="sound-notifications" className="text-base">Notificaciones sonoras</Label>
                  <p className="text-sm text-muted-foreground">
                    Reproducir sonidos para alertas y notificaciones
                  </p>
                </div>
                <Switch 
                  id="sound-notifications"
                  checked={systemSettings.soundNotifications}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, soundNotifications: checked})}
                />
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <Label htmlFor="stock-alerts" className="text-base">Alertas de inventario</Label>
                  <p className="text-sm text-muted-foreground">
                    Mostrar alertas cuando el stock esté bajo
                  </p>
                </div>
                <Switch 
                  id="stock-alerts"
                  checked={systemSettings.stockAlerts}
                  onCheckedChange={(checked) => setSystemSettings({...systemSettings, stockAlerts: checked})}
                />
              </div>
              
              <div className="pt-2">
                <Label htmlFor="low-stock">Umbral de stock bajo</Label>
                <div className="flex items-center gap-2 mt-2">
                  <Input 
                    id="low-stock" 
                    type="number"
                    className="max-w-24"
                    min="1"
                    value={systemSettings.lowStockThreshold}
                    onChange={(e) => setSystemSettings({...systemSettings, lowStockThreshold: Number(e.target.value)})}
                    disabled={!systemSettings.stockAlerts}
                  />
                  <span className="text-sm text-muted-foreground">unidades</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label htmlFor="backup-frequency" className="text-base">Frecuencia de respaldo</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Frecuencia con la que se realizan copias de seguridad automáticas
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant={systemSettings.backupFrequency === "daily" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSystemSettings({...systemSettings, backupFrequency: "daily"})}
                  >
                    Diario
                  </Button>
                  <Button 
                    variant={systemSettings.backupFrequency === "weekly" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSystemSettings({...systemSettings, backupFrequency: "weekly"})}
                  >
                    Semanal
                  </Button>
                  <Button 
                    variant={systemSettings.backupFrequency === "monthly" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSystemSettings({...systemSettings, backupFrequency: "monthly"})}
                  >
                    Mensual
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-base">Acciones del sistema</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <Button variant="outline" className="gap-2">
                    <RefreshCcw className="h-4 w-4" /> Realizar respaldo ahora
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" /> Reiniciar datos
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción eliminará todos los productos, clientes y facturas del sistema.
                          Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={handleReset}
                        >
                          Reiniciar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="gap-2"
                onClick={handleSaveSystemSettings}
              >
                <Save className="h-4 w-4" /> Guardar Configuración
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Usuarios</CardTitle>
              <CardDescription>
                Administra los usuarios que tienen acceso al sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">Usuarios del Sistema</Label>
                <div className="border rounded-md">
                  <table className="w-full dom-table">
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>admin</td>
                        <td>admin@example.com</td>
                        <td>Administrador</td>
                        <td>
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Activo
                          </span>
                        </td>
                        <td className="text-right">
                          <Button variant="ghost" size="sm" disabled>Editar</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>supervisor</td>
                        <td>supervisor@example.com</td>
                        <td>Supervisor</td>
                        <td>
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Activo
                          </span>
                        </td>
                        <td className="text-right">
                          <Button variant="ghost" size="sm" disabled>Editar</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>cajero</td>
                        <td>cajero@example.com</td>
                        <td>Cajero</td>
                        <td>
                          <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Activo
                          </span>
                        </td>
                        <td className="text-right">
                          <Button variant="ghost" size="sm" disabled>Editar</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground">
                  Para modificar usuarios, contacta al administrador del sistema
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
