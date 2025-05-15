
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText, Trash, Eye } from "lucide-react";
import { InvoiceForm } from "@/components/invoices/InvoiceForm";
import { useAppContext, Invoice } from "@/contexts/AppContext";

export const Invoices = () => {
  const { invoices, addInvoice, updateInvoice, deleteInvoice } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState<Invoice | null>(null);
  
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Pagada":
        return "bg-green-500 hover:bg-green-600";
      case "Pendiente":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Cancelada":
        return "bg-destructive hover:bg-red-700";
      default:
        return "bg-gray-500";
    }
  };
  
  const handleInvoiceCreate = (invoice: Omit<Invoice, "id">) => {
    addInvoice(invoice);
    setIsAddDialogOpen(false);
  };
  
  const handleInvoiceDelete = (id: string) => {
    deleteInvoice(id);
  };
  
  const handleStatusChange = (invoiceId: string, status: "Pagada" | "Pendiente" | "Cancelada") => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (invoice) {
      updateInvoice({
        ...invoice,
        status
      });
    }
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Facturación</h2>
          <p className="text-muted-foreground">Gestiona tus facturas y pagos</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2 shadow transition-all">
              <Plus className="h-4 w-4" />
              Nueva Factura
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crear Nueva Factura</DialogTitle>
            </DialogHeader>
            <InvoiceForm 
              onSubmit={handleInvoiceCreate}
              onCancel={() => setIsAddDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Modal para ver detalles de factura */}
        <Dialog 
          open={!!showInvoiceDetails} 
          onOpenChange={(open) => !open && setShowInvoiceDetails(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalles de Factura</DialogTitle>
            </DialogHeader>
            {showInvoiceDetails && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Número de Factura</div>
                    <div className="font-medium">{showInvoiceDetails.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Fecha</div>
                    <div className="font-medium">{showInvoiceDetails.date}</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Cliente</div>
                  <div className="font-medium">{showInvoiceDetails.client}</div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Estado</div>
                  <Badge className={getStatusColor(showInvoiceDetails.status)}>
                    {showInvoiceDetails.status}
                  </Badge>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="font-medium mb-2">Cambiar Estado:</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={showInvoiceDetails.status === "Pagada" ? "bg-green-500 text-white" : ""}
                      onClick={() => handleStatusChange(showInvoiceDetails.id, "Pagada")}
                    >
                      Pagada
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={showInvoiceDetails.status === "Pendiente" ? "bg-yellow-500 text-white" : ""}
                      onClick={() => handleStatusChange(showInvoiceDetails.id, "Pendiente")}
                    >
                      Pendiente
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={showInvoiceDetails.status === "Cancelada" ? "bg-destructive text-white" : ""}
                      onClick={() => handleStatusChange(showInvoiceDetails.id, "Cancelada")}
                    >
                      Cancelada
                    </Button>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="font-medium mb-2">Total</div>
                  <div className="text-2xl font-bold">${showInvoiceDetails.total.toFixed(2)}</div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Lista de Facturas</CardTitle>
          <CardDescription>
            Total: {filteredInvoices.length} facturas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar facturas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-56">
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="Pagada">Pagada</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="hidden md:table-cell">Fecha</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell className="hidden md:table-cell">{invoice.date}</TableCell>
                      <TableCell className="text-right">${invoice.total.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowInvoiceDetails(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar factura?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar la factura {invoice.id}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleInvoiceDelete(invoice.id)}
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <FileText className="h-8 w-8" />
                        <p>No se encontraron facturas</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Invoices;
