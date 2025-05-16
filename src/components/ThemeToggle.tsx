
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden rounded-full w-10 h-10 border border-input"
      title={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    >
      <div className={cn(
        "absolute inset-0 transition-colors duration-300",
        theme === "dark" ? "bg-slate-950" : "bg-blue-50"
      )} />
      
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="relative z-10"
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-amber-500 drop-shadow-md" />
        ) : (
          <Moon className="h-5 w-5 text-blue-300 drop-shadow-md" />
        )}
      </motion.div>
    </Button>
  );
}
