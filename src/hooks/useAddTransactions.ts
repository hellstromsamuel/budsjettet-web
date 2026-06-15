import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/auth";
import {
  transactionsKey,
  type TransactionInsert,
} from "@/hooks/useTransactions";

export type NewTransaction = Omit<TransactionInsert, "user_id">;

export function useAddTransactions() {
  const session = useSession();
  const userId = session?.user.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactions: NewTransaction[]) => {
      if (!userId) throw new Error("Not authenticated");

      const rows = transactions.map((t) => ({ ...t, user_id: userId }));
      const { data, error } = await supabase
        .from("transactions")
        .insert(rows)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: transactionsKey(userId) });
    },
  });
}
