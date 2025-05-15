import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

// Definición de tipos
export interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: "Disponible" | "Bajo Stock" | "Sin Stock";
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPurchases: number;
}

export interface Invoice {
  id: string;
  client: string;
  date: string;
  total: number;
  status: "Pagada" | "Pendiente" | "Cancelada";
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

interface AppContextType {
  products: Product[];
  clients: Client[];
  invoices: Invoice[];
  addProduct: (product: Omit<Product, "id" | "status">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addClient: (client: Omit<Client, "id" | "totalPurchases">) => void;
  updateClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  addInvoice: (invoice: Omit<Invoice, "id">) => void;
  updateInvoice: (invoice: Invoice) => void;
  deleteInvoice: (id: string) => void;
  generateProductId: () => string;
  generateClientId: () => string;
  generateInvoiceId: () => string;
}

// Datos iniciales
const initialProducts: Product[] = [
  {
    id: "PRD001",
    name: "Laptop HP Pavilion",
    category: "Electrónicos",
    stock: 15,
    price: 12500,
    status: "Disponible",
  },
  {
    id: "PRD002",
    name: "Monitor Dell 24''",
    category: "Periféricos",
    stock: 8,
    price: 3200,
    status: "Bajo Stock",
  },
  {
    id: "PRD003",
    name: "Teclado Logitech MX",
    category: "Periféricos",
    stock: 0,
    price: 1200,
    status: "Sin Stock",
  },
  {
    id: "PRD004",
    name: "Mouse Gaming Razer",
    category: "Periféricos",
    stock: 22,
    price: 950,
    status: "Disponible",
  },
  {
    id: "PRD005",
    name: "Impresora Canon",
    category: "Equipos de Oficina",
    stock: 5,
    price: 2800,
    status: "Bajo Stock",
  },
];

const initialClients: Client[] = [
  {
    id: "CLI001",
    name: "Empresa Tecnología S.A.",
    email: "contacto@empresatech.com",
    phone: "555-123-4567",
    address: "Av. Reforma 123, CDMX",
    totalPurchases: 45600,
  },
  {
    id: "CLI002",
    name: "Distribuidora Industrial",
    email: "ventas@distribuidora.com",
    phone: "555-987-6543",
    address: "Calle Industrial 45, Monterrey",
    totalPurchases: 28900,
  },
  {
    id: "CLI003",
    name: "Cafetería El Grano",
    email: "info@elgrano.com",
    phone: "555-456-7890",
    address: "Plaza Central 78, Guadalajara",
    totalPurchases: 12400,
  },
  {
    id: "CLI004",
    name: "Boutique Elegancia",
    email: "boutique@elegancia.mx",
    phone: "555-234-5678",
    address: "Calle Moda 23, CDMX",
    totalPurchases: 35700,
  },
  {
    id: "CLI005",
    name: "Ferretería Construcción",
    email: "ventas@ferreteria.com",
    phone: "555-345-6789",
    address: "Av. Herramientas 56, Puebla",
    totalPurchases: 19800,
  },
];

const initialInvoices: Invoice[] = [
  {
    id: "INV-2025-001",
    client: "Empresa Tecnología S.A.",
    date: "12/05/2025",
    total: 12500.00,
    status: "Pagada",
  },
  {
    id: "INV-2025-002",
    client: "Distribuidora Industrial",
    date: "10/05/2025",
    total: 8750.50,
    status: "Pendiente",
  },
  {
    id: "INV-2025-003",
    client: "Cafetería El Grano",
    date: "05/05/2025",
    total: 3200.75,
    status: "Pagada",
  },
  {
    id: "INV-2025-004",
    client: "Boutique Elegancia",
    date: "28/04/2025",
    total: 6500.00,
    status: "Cancelada",
  },
  {
    id: "INV-2025-005",
    client: "Ferretería Construcción",
    date: "25/04/2025",
    total: 9800.25,
    status: "Pagada",
  },
];

// Crear contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
};

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cargar datos del localStorage si existen
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });
  
  const [clients, setClients] = useState<Client[]>(() => {
    const savedClients = localStorage.getItem("clients");
    return savedClients ? JSON.parse(savedClients) : initialClients;
  });
  
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const savedInvoices = localStorage.getItem("invoices");
    return savedInvoices ? JSON.parse(savedInvoices) : initialInvoices;
  });

  // Guardar en localStorage cuando cambian los datos
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  // Generadores de ID
  const generateProductId = () => {
    const lastId = products.length > 0 ? parseInt(products[products.length - 1].id.replace("PRD", "")) : 0;
    return `PRD${String(lastId + 1).padStart(3, "0")}`;
  };

  const generateClientId = () => {
    const lastId = clients.length > 0 ? parseInt(clients[clients.length - 1].id.replace("CLI", "")) : 0;
    return `CLI${String(lastId + 1).padStart(3, "0")}`;
  };

  const generateInvoiceId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const lastInvoiceNumber = invoices.length > 0
      ? parseInt(invoices[invoices.length - 1].id.split("-")[2])
      : 0;
    return `INV-${year}-${String(lastInvoiceNumber + 1).padStart(3, "0")}`;
  };

  // Funciones para productos
  const addProduct = (productData: Omit<Product, "id" | "status">) => {
    const newId = generateProductId();
    const status: Product["status"] = productData.stock > 10 ? "Disponible" : productData.stock > 0 ? "Bajo Stock" : "Sin Stock";
    
    const newProduct: Product = {
      id: newId,
      ...productData,
      status
    };
    
    // Modificado para agregar al principio del array
    setProducts([newProduct, ...products]);
    toast({
      title: "Producto agregado",
      description: `Se ha agregado ${newProduct.name} al inventario.`
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    const status: Product["status"] = updatedProduct.stock > 10 ? "Disponible" : updatedProduct.stock > 0 ? "Bajo Stock" : "Sin Stock";
    const productWithStatus = { ...updatedProduct, status };
    
    setProducts(products.map(product => 
      product.id === updatedProduct.id ? productWithStatus : product
    ));
    
    toast({
      title: "Producto actualizado",
      description: `Se ha actualizado ${updatedProduct.name} en el inventario.`
    });
  };

  const deleteProduct = (id: string) => {
    const productToDelete = products.find(product => product.id === id);
    if (productToDelete) {
      setProducts(products.filter(product => product.id !== id));
      toast({
        title: "Producto eliminado",
        description: `Se ha eliminado ${productToDelete.name} del inventario.`
      });
    }
  };

  // Funciones para clientes
  const addClient = (clientData: Omit<Client, "id" | "totalPurchases">) => {
    const newId = generateClientId();
    const newClient: Client = {
      id: newId,
      ...clientData,
      totalPurchases: 0
    };
    
    // Modificado para agregar al principio del array
    setClients([newClient, ...clients]);
    toast({
      title: "Cliente agregado",
      description: `Se ha agregado ${newClient.name} a la base de datos.`
    });
  };

  const updateClient = (updatedClient: Client) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
    
    toast({
      title: "Cliente actualizado",
      description: `Se ha actualizado la información de ${updatedClient.name}.`
    });
  };

  const deleteClient = (id: string) => {
    const clientToDelete = clients.find(client => client.id === id);
    if (clientToDelete) {
      setClients(clients.filter(client => client.id !== id));
      toast({
        title: "Cliente eliminado",
        description: `Se ha eliminado a ${clientToDelete.name} de la base de datos.`
      });
    }
  };

  // Funciones para facturas
  const addInvoice = (invoiceData: Omit<Invoice, "id">) => {
    const newId = generateInvoiceId();
    const newInvoice: Invoice = {
      id: newId,
      ...invoiceData
    };
    
    // Modificado para agregar al principio del array
    setInvoices([newInvoice, ...invoices]);
    toast({
      title: "Factura creada",
      description: `Se ha creado la factura ${newId}.`
    });
    
    // Actualizar compras totales del cliente
    const clientToUpdate = clients.find(client => client.name === newInvoice.client);
    if (clientToUpdate) {
      const updatedClient = {
        ...clientToUpdate,
        totalPurchases: clientToUpdate.totalPurchases + newInvoice.total
      };
      updateClient(updatedClient);
    }
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === updatedInvoice.id ? updatedInvoice : invoice
    ));
    
    toast({
      title: "Factura actualizada",
      description: `Se ha actualizado la factura ${updatedInvoice.id}.`
    });
  };

  const deleteInvoice = (id: string) => {
    const invoiceToDelete = invoices.find(invoice => invoice.id === id);
    if (invoiceToDelete) {
      setInvoices(invoices.filter(invoice => invoice.id !== id));
      toast({
        title: "Factura eliminada",
        description: `Se ha eliminado la factura ${id}.`
      });
    }
  };

  // Valor del contexto
  const value = {
    products,
    clients,
    invoices,
    addProduct,
    updateProduct,
    deleteProduct,
    addClient,
    updateClient,
    deleteClient,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    generateProductId,
    generateClientId,
    generateInvoiceId
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
