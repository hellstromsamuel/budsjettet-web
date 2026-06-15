import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DialogDrawer,
  DialogDrawerContent,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "@/components/ui/dialog-drawer";
import { AddTransactions } from "./AddTransactions";
import { TransactionsTable } from "./TransactionsTable";

export function TransactionsSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Transaksjoner</h1>
        <DialogDrawer open={open} onOpenChange={setOpen}>
          <DialogDrawerTrigger asChild>
            <Button>
              <Plus className="size-4" />
              Legg til
            </Button>
          </DialogDrawerTrigger>
          <DialogDrawerContent className="sm:max-w-3xl">
            <DialogDrawerHeader>
              <DialogDrawerTitle>Legg til transaksjoner</DialogDrawerTitle>
            </DialogDrawerHeader>
            <AddTransactions onDone={() => setOpen(false)} />
          </DialogDrawerContent>
        </DialogDrawer>
      </div>

      <TransactionsTable />
    </section>
  );
}
