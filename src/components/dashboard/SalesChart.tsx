
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SalesChart = () => {
  // Empty data arrays - will be populated when users add invoices
  const emptyYearlyData = [
    { name: "Ene", ventas: 0 },
    { name: "Feb", ventas: 0 },
    { name: "Mar", ventas: 0 },
    { name: "Abr", ventas: 0 },
    { name: "May", ventas: 0 },
    { name: "Jun", ventas: 0 },
    { name: "Jul", ventas: 0 },
  ];

  const emptyMonthlyData = [
    { name: "1", ventas: 0 },
    { name: "5", ventas: 0 },
    { name: "10", ventas: 0 },
    { name: "15", ventas: 0 },
    { name: "20", ventas: 0 },
    { name: "25", ventas: 0 },
    { name: "30", ventas: 0 },
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Ventas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly">
          <TabsList>
            <TabsTrigger value="yearly">Anual</TabsTrigger>
            <TabsTrigger value="monthly">Este Mes</TabsTrigger>
          </TabsList>
          <TabsContent value="yearly" className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={emptyYearlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ventas"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorVentas)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={emptyMonthlyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ventas"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorVentas)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
