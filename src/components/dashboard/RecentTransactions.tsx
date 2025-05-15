
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Transaction {
  id: string;
  customer: string;
  amount: string;
  status: "completado" | "pendiente" | "cancelado";
  date: string;
}

const transactions: Transaction[] = [
  {
    id: "INV-001",
    customer: "Electrónica TechMex",
    amount: "$1,250.00",
    status: "completado",
    date: "Hoy, 10:30 AM",
  },
  {
    id: "INV-002",
    customer: "Mueblería Central",
    amount: "$3,450.00",
    status: "pendiente",
    date: "Ayer, 3:20 PM",
  },
  {
    id: "INV-003",
    customer: "Cafetería El Rincón",
    amount: "$820.00",
    status: "completado",
    date: "Ayer, 11:45 AM",
  },
  {
    id: "INV-004",
    customer: "Ferretería Herramex",
    amount: "$1,680.00",
    status: "cancelado",
    date: "12 Mayo, 9:00 AM",
  },
];

const getStatusColor = (status: Transaction["status"]) => {
  switch (status) {
    case "completado":
      return "bg-green-500";
    case "pendiente":
      return "bg-yellow-500";
    case "cancelado":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const RecentTransactions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transacciones Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{transaction.customer}</span>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(transaction.status)}`} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {transaction.id} · {transaction.date}
                </div>
              </div>
              <div className="font-medium">{transaction.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
