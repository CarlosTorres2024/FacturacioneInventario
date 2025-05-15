
import React, { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from "lucide-react";
import { useAppContext, Invoice, InvoiceItem } from "@/contexts/AppContext";

interface InvoiceFormProps {
  onSubmit: (invoice: Omit<Invoice, "id">) => void;
  onCancel: () => void;
}

export const InvoiceForm = ({ onSubmit, onCancel }: InvoiceFormProps) => {
  const { clients, products, generateInvoiceId } = useAppContext();
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  
  // Inicializar valores
  useEffect(() => {
    // Formato de fecha: DD/MM/YYYY
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    setInvoiceNumber(generateInvoiceId());
    setDate(`${dd}/${mm}/${yyyy}`);
  }, [generateInvoiceId]);
  
  // Calcular totales cuando cambien los items
  useEffect(() => {
    const calculatedSubtotal = items.reduce((sum, item) => sum + item.total, 0);
    const calculatedTax = calculatedSubtotal * 0.16; // 16% IVA
    const calculatedTotal = calculatedSubtotal + calculatedTax;
    
    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setTotal(calculatedTotal);
  }, [items]);
  
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${items.length + 1}`,
      productId: "",
      productName: "",
      quantity: 1,
      price: 0,
      total: 0
    };
    
    setItems([...items, newItem]);
  };
  
  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Si se seleccionó un producto, actualizar precio y nombre
        if (field === "productId" && value) {
          const selectedProduct = products.find(p => p.id === value);
          if (selectedProduct) {
            updatedItem.productName = selectedProduct.name;
            updatedItem.price = selectedProduct.price;
            updatedItem.total = updatedItem.quantity * selectedProduct.price;
          }
        }
        
        // Si cambió la cantidad, recalcular total
        if (field === "quantity") {
          updatedItem.total = updatedItem.price * value;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientName || items.length === 0) return;
    
    const newInvoice: Omit<Invoice, "id"> = {
      client: clientName,
      date,
      total,
      status: "Pendiente",
      items
    };
    
    onSubmit(newInvoice);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="invoiceNumber">Número de Factura</Label>
          <Input id="invoiceNumber" value={invoiceNumber} readOnly />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="date">Fecha</Label>
          <Input id="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="client">Cliente</Label>
        <Select
          value={clientName}
          onValueChange={setClientName}
        >
          <SelectTrigger id="client">
            <SelectValue placeholder="Seleccionar cliente" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.name}>{client.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="border rounded-lg p-4">
        <div className="font-medium mb-4 flex justify-between items-center">
          <div>Items de Factura</div>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={handleAddItem}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar Item
          </Button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            No hay items en esta factura. Agrega productos usando el botón de arriba.
          </div>
        ) : (
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-center">Cantidad</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Select
                        value={item.productId}
                        onValueChange={(value) => updateItem(item.id, "productId", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar producto" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 1)}
                        className="w-20 mx-auto"
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-y-2">
        <div className="w-1/3 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>IVA (16%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={items.length === 0 || !clientName}
        >
          Guardar Factura
        </Button>
      </div>
    </form>
  );
};
