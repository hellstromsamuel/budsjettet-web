import { format } from "date-fns";
import { nb } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useTransactions, type Transaction } from "@/hooks/useTransactions";

const formatAmount = (transaction: Transaction) => {
  const sign = transaction.type === "expense" ? "-" : "+";
  return `${sign}${new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
  }).format(transaction.amount)}`;
};

export function TransactionsTable() {
  const { data, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Ingen transaksjoner ennå.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Dato</TableHead>
          <TableHead>Beskrivelse</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="text-right">Beløp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {format(new Date(transaction.date), "d. MMM yyyy", {
                locale: nb,
              })}
            </TableCell>
            <TableCell>{transaction.description ?? "—"}</TableCell>
            <TableCell>
              {transaction.type === "income" ? "Inntekt" : "Utgift"}
            </TableCell>
            <TableCell
              className={cn(
                "text-right font-medium",
                transaction.type === "expense"
                  ? "text-destructive"
                  : "text-foreground",
              )}
            >
              {formatAmount(transaction)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
