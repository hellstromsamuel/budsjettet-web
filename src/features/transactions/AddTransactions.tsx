import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogDrawerFooter } from "@/components/ui/dialog-drawer";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { DatePicker } from "@/components/ui/date-picker";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  useAddTransactions,
  type NewTransaction,
} from "@/hooks/useAddTransactions";
import {
  TRANSACTION_TYPE_LABEL,
  type TransactionType,
} from "@/hooks/useTransactions";

type DraftRow = {
  amount: string;
  type: TransactionType;
  description: string;
  date: Date;
};

const emptyRow = (): DraftRow => ({
  amount: "",
  type: "expense",
  description: "",
  date: new Date(),
});

export function AddTransactions({ onDone }: { onDone: () => void }) {
  const [rows, setRows] = useState<DraftRow[]>([emptyRow()]);
  const addMutation = useAddTransactions();
  const focusIndexRef = useRef<number | null>(null);
  const amountRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (focusIndexRef.current !== null) {
      amountRefs.current[focusIndexRef.current]?.focus();
      focusIndexRef.current = null;
    }
  }, [rows.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        addRow();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [rows.length]);

  const updateRow = (index: number, patch: Partial<DraftRow>) =>
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );

  const removeRow = (index: number) =>
    setRows((prev) => prev.filter((_, i) => i !== index));

  const addRow = () => {
    focusIndexRef.current = rows.length;
    setRows((prev) => [...prev, emptyRow()]);
  };

  const handleSubmit = async () => {
    const payload: NewTransaction[] = rows
      .filter((row) => row.amount.trim() !== "")
      .map((row) => ({
        amount: Number(row.amount),
        type: row.type,
        description: row.description.trim() || null,
        date: format(row.date, "yyyy-MM-dd"),
      }));

    if (payload.length === 0) return;

    await addMutation.mutateAsync(payload);
    onDone();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        {rows.map((row, index) => (
          <div
            key={index}
            className="relative rounded-lg border p-4 sm:border-0 sm:p-0 sm:flex sm:items-center sm:gap-2"
          >
            {/* Mobile delete — top right */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-destructive hover:text-destructive sm:hidden"
              onClick={() => removeRow(index)}
              disabled={rows.length === 1}
              aria-label="Fjern rad"
            >
              <Trash2 className="size-4" />
            </Button>

            {/* Mobile: 2-col grid */}
            <div className="grid grid-cols-2 gap-2 sm:contents">
              <ToggleGroup
                type="single"
                value={row.type}
                onValueChange={(value) =>
                  value && updateRow(index, { type: value as TransactionType })
                }
                variant="outline"
                spacing={0}
                className="col-span-2 sm:flex-none"
              >
                <ToggleGroupItem value="income">{TRANSACTION_TYPE_LABEL.income}</ToggleGroupItem>
                <ToggleGroupItem value="expense">{TRANSACTION_TYPE_LABEL.expense}</ToggleGroupItem>
              </ToggleGroup>
              <Input
                ref={(el) => { amountRefs.current[index] = el; }}
                type="number"
                inputMode="decimal"
                placeholder="Beløp"
                className="sm:w-24"
                value={row.amount}
                onChange={(e) => updateRow(index, { amount: e.target.value })}
              />
              <Input
                placeholder="Beskrivelse"
                className="sm:w-40 sm:flex-1 sm:min-w-0"
                value={row.description}
                onChange={(e) => updateRow(index, { description: e.target.value })}
              />
              <DatePicker
                value={row.date}
                onChange={(date) => date && updateRow(index, { date })}
                className="col-span-2 w-full sm:w-40"
              />
            </div>

            {/* Desktop delete */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex text-destructive hover:text-destructive"
              onClick={() => removeRow(index)}
              disabled={rows.length === 1}
              aria-label="Fjern rad"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-fit border-2 border-dashed bg-background"
        onClick={addRow}
      >
        <Plus className="size-4" />
        Ny rad
        <KbdGroup className="ml-1 hidden sm:inline-flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <DialogDrawerFooter>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={addMutation.isPending}
        >
          <Check className="size-4" />
          {addMutation.isPending ? "Lagrer…" : "Lagre"}
        </Button>
      </DialogDrawerFooter>
    </div>
  );
}
