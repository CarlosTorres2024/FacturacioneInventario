
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAppContext } from "@/contexts/AppContext";

export const InventoryStatus = () => {
  const { products } = useAppContext();
  
  // Filter products with stock < min_stock
  const lowStockProducts = products
    .filter(p => p.stock < 10)
    .slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estado del Inventario</CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length > 0 ? (
          <div className="space-y-4">
            {lowStockProducts.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`text-sm font-medium ${item.status === "Sin Stock" ? "text-red-500" : 
                                    item.status === "Bajo Stock" ? "text-yellow-500" : "text-green-500"}`}>
                    {item.stock}/{10}
                  </span>
                </div>
                <Progress value={(item.stock / 10) * 100} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>No hay productos en el inventario</p>
            <p className="text-sm">Agregue productos para ver el estado del inventario</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
