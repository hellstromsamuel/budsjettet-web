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
import {
  useTransactions,
  type Transaction,
  TRANSACTION_TYPE_EMOJI,
} from "@/hooks/useTransactions";

const formatAmount = (transaction: Transaction) => {
  const sign = transaction.type === "expense" ? "-" : "+";
  return `${sign}${new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
  }).format(transaction.amount)}`;
};

const formatDate = (date: string) =>
  format(new Date(date), "d. MMM yyyy", { locale: nb });

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
    <>
      {/* Mobile: card list */}
      <div className="flex flex-col divide-y sm:hidden">
        {data.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between py-3">
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium">
                {transaction.description ?? "—"}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(transaction.date)}
              </span>
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                transaction.type === "expense" ? "text-destructive" : "text-green-700",
              )}
            >
              {formatAmount(transaction)}
              <span className="ml-2">{TRANSACTION_TYPE_EMOJI[transaction.type]}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <Table className="hidden sm:table">
        <TableHeader>
          <TableRow>
            <TableHead>Dato</TableHead>
            <TableHead>Beskrivelse</TableHead>
            <TableHead className="text-right">Beløp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDate(transaction.date)}</TableCell>
              <TableCell>{transaction.description ?? "—"}</TableCell>
              <TableCell
                className={cn(
                  "text-right font-medium",
                  transaction.type === "expense"
                    ? "text-destructive"
                    : "text-green-700",
                )}
              >
                {formatAmount(transaction)}
                <span className="ml-3">
                  {TRANSACTION_TYPE_EMOJI[transaction.type]}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
