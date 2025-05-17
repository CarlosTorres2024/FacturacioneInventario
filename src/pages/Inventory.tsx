
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Plus, Search, Package, Edit, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useAppContext, Product } from "@/contexts/AppContext";

const categories = ["Electrónicos", "Periféricos", "Equipos de Oficina", "Mobiliario", "Software"];

export const Inventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    stock: 0,
    price: 0,
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Disponible":
        return "bg-green-500 hover:bg-green-600";
      case "Bajo Stock":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "Sin Stock":
        return "bg-destructive hover:bg-red-700";
      default:
        return "bg-gray-500";
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || newProduct.stock < 0 || newProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos correctamente",
        variant: "destructive",
      });
      return;
    }

    addProduct({
      name: newProduct.name,
      category: newProduct.category,
      stock: newProduct.stock,
      price: newProduct.price,
    });

    setNewProduct({
      name: "",
      category: "",
      stock: 0,
      price: 0,
    });
    
    setIsAddDialogOpen(false);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct || !editingProduct.name || !editingProduct.category || editingProduct.stock < 0 || editingProduct.price <= 0) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos correctamente",
        variant: "destructive",
      });
      return;
    }

    updateProduct(editingProduct);
    setEditingProduct(null);
    setIsEditDialogOpen(false);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  return (
    <div className="space-y-6 animate-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
          <p className="text-muted-foreground">Gestiona los productos y su stock</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 gap-2 shadow transition-all">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Producto</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  placeholder="Nombre del producto"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({...newProduct, category: value})}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input 
                    id="stock" 
                    type="number" 
                    placeholder="0"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Precio (DO)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleAddProduct}>Guardar Producto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Editar Producto</DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Nombre</Label>
                  <Input 
                    id="edit-name" 
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Categoría</Label>
                  <Select
                    value={editingProduct.category}
                    onValueChange={(value) => setEditingProduct({...editingProduct, category: value})}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-stock">Stock</Label>
                    <Input 
                      id="edit-stock" 
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Precio (DO)</Label>
                    <Input 
                      id="edit-price" 
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button onClick={handleUpdateProduct}>Actualizar Producto</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Lista de Productos</CardTitle>
          <CardDescription>
            Total: {filteredProducts.length} productos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-56">
              <Select
                value={categoryFilter}
                onValueChange={(value) => setCategoryFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>ID</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="hidden md:table-cell">Categoría</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                      <TableCell className="text-right">{product.stock}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={getStatusColor(product.status)}>
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar el producto {product.name}?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={() => handleDeleteProduct(product.id)}
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
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Package className="h-8 w-8" />
                        <p>No se encontraron productos</p>
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

export default Inventory;
