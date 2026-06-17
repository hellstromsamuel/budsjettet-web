import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/auth";
import type { Database } from "@/lib/database.types";

export type Transaction =
  Database["public"]["Tables"]["transactions"]["Row"];
export type TransactionInsert =
  Database["public"]["Tables"]["transactions"]["Insert"];
export type TransactionType =
  Database["public"]["Enums"]["transaction_type"];

export const TRANSACTION_TYPE_LABEL: Record<TransactionType, string> = {
  income: "🤑 Inn",
  expense: "💸 Ut",
};

export const TRANSACTION_TYPE_EMOJI: Record<TransactionType, string> = {
  income: "🤑",
  expense: "💸",
};

export const transactionsKey = (userId?: string) =>
  ["transactions", userId] as const;

export function useTransactions() {
  const session = useSession();
  const userId = session?.user.id;

  return useQuery({
    queryKey: transactionsKey(userId),
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}
