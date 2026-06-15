import { useState } from "react";
import { format } from "date-fns";
import { Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogDrawerFooter } from "@/components/ui/dialog-drawer";
import { DatePicker } from "@/components/ui/date-picker";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  useAddTransactions,
  type NewTransaction,
} from "@/hooks/useAddTransactions";
import type { TransactionType } from "@/hooks/useTransactions";

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

  const updateRow = (index: number, patch: Partial<DraftRow>) =>
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );

  const removeRow = (index: number) =>
    setRows((prev) => prev.filter((_, i) => i !== index));

  const addRow = () => setRows((prev) => [...prev, emptyRow()]);

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
            className="flex flex-wrap items-center gap-2 sm:flex-nowrap"
          >
            <ToggleGroup
              type="single"
              value={row.type}
              onValueChange={(value) =>
                value && updateRow(index, { type: value as TransactionType })
              }
              variant="outline"
              spacing={0}
            >
              <ToggleGroupItem value="income">Inntekt</ToggleGroupItem>
              <ToggleGroupItem value="expense">Utgift</ToggleGroupItem>
            </ToggleGroup>
            <Input
              type="number"
              inputMode="decimal"
              placeholder="Beløp"
              className="w-24"
              value={row.amount}
              onChange={(e) => updateRow(index, { amount: e.target.value })}
            />
            <Input
              placeholder="Beskrivelse"
              className="w-40 flex-1 min-w-0"
              value={row.description}
              onChange={(e) =>
                updateRow(index, { description: e.target.value })
              }
            />
            <DatePicker
              value={row.date}
              onChange={(date) => date && updateRow(index, { date })}
              className="w-40"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
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
        size="sm"
        className="w-fit"
        onClick={addRow}
      >
        <Plus className="size-4" />
        Ny rad
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
