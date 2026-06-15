import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
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
  date: string;
};

const today = () => new Date().toISOString().slice(0, 10);

const emptyRow = (): DraftRow => ({
  amount: "",
  type: "expense",
  description: "",
  date: today(),
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
        date: row.date,
      }));

    if (payload.length === 0) return;

    await addMutation.mutateAsync(payload);
    onDone();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-2">
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
              className="w-28"
              value={row.amount}
              onChange={(e) => updateRow(index, { amount: e.target.value })}
            />
            <Input
              placeholder="Beskrivelse"
              value={row.description}
              onChange={(e) =>
                updateRow(index, { description: e.target.value })
              }
            />
            <Input
              type="date"
              className="w-40"
              value={row.date}
              onChange={(e) => updateRow(index, { date: e.target.value })}
            />
            <Button
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

      <Button variant="outline" size="sm" className="w-fit" onClick={addRow}>
        <Plus className="size-4" />
        Ny rad
      </Button>

      <DialogFooter>
        <Button onClick={handleSubmit} disabled={addMutation.isPending}>
          {addMutation.isPending ? "Lagrer…" : "Lagre"}
        </Button>
      </DialogFooter>
    </div>
  );
}
