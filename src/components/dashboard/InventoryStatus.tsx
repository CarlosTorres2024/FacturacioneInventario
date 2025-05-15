
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  name: string;
  stock: number;
  maxStock: number;
  status: "bajo" | "medio" | "óptimo";
}

const inventoryItems: InventoryItem[] = [
  {
    name: "Laptop HP 15'",
    stock: 25,
    maxStock: 50,
    status: "medio",
  },
  {
    name: "Monitor Dell 24'",
    stock: 8,
    maxStock: 30,
    status: "bajo",
  },
  {
    name: "Teclado Logitech",
    stock: 45,
    maxStock: 50,
    status: "óptimo",
  },
  {
    name: "Mouse Inalámbrico",
    stock: 12,
    maxStock: 40,
    status: "bajo",
  },
];

const getStatusColor = (status: InventoryItem["status"]) => {
  switch (status) {
    case "bajo":
      return "text-red-500";
    case "medio":
      return "text-yellow-500";
    case "óptimo":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

export const InventoryStatus = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado del Inventario</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {inventoryItems.map((item) => (
            <div key={item.name} className="space-y-1">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{item.name}</span>
                <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                  {item.stock}/{item.maxStock}
                </span>
              </div>
              <Progress value={(item.stock / item.maxStock) * 100} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
