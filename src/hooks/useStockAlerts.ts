
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";

export const useStockAlerts = () => {
  const { products } = useAppContext();
  const [alertShown, setAlertShown] = useState(false);
  const [lowStockProducts, setLowStockProducts] = useState<string[]>([]);
  const [noStockProducts, setNoStockProducts] = useState<string[]>([]);

  const playAlertSound = () => {
    try {
      const audio = new Audio("/alert-sound.mp3");
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.error("Error reproduciendo sonido:", error);
      });
    } catch (error) {
      console.error("Error al crear objeto de audio:", error);
    }
  };

  useEffect(() => {
    // No mostrar alertas si no hay productos
    if (!products || products.length === 0) {
      setLowStockProducts([]);
      setNoStockProducts([]);
      return;
    }
    
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5);
    const noStock = products.filter(p => p.stock === 0);
    
    setLowStockProducts(lowStock.map(p => p.name));
    setNoStockProducts(noStock.map(p => p.name));

    // Solo mostramos alertas si hay productos con bajo stock o sin stock
    // y si aún no hemos mostrado la alerta
    if (!alertShown && (lowStock.length > 0 || noStock.length > 0)) {
      // Evitar mostrar la alerta más de una vez
      setAlertShown(true);
      
      // Productos sin stock
      if (noStock.length > 0) {
        toast({
          title: `¡Alerta! ${noStock.length} productos sin stock`,
          description: `${noStock.map(p => p.name).join(", ")}`,
          variant: "destructive",
          duration: 5000,
        });
        playAlertSound();
      }
      
      // Productos con bajo stock
      if (lowStock.length > 0) {
        setTimeout(() => {
          toast({
            title: `¡Alerta! ${lowStock.length} productos con bajo stock`,
            description: `${lowStock.map(p => p.name).join(", ")}`,
            variant: "warning",
            duration: 5000,
          });
          playAlertSound();
        }, noStock.length > 0 ? 1000 : 0); // Si hay alerta de sin stock, retrasamos esta
      }
    }
  }, [products, alertShown]);

  return {
    lowStockProducts,
    noStockProducts,
    hasAlerts: lowStockProducts.length > 0 || noStockProducts.length > 0
  };
};
