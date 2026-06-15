import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddTransactions } from "./AddTransactions";
import { TransactionsTable } from "./TransactionsTable";

export function TransactionsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transaksjoner</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
              Legg til
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Legg til transaksjoner</DialogTitle>
            </DialogHeader>
            <AddTransactions onDone={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <TransactionsTable />
    </section>
  );
}
