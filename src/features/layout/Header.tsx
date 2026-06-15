import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

const CONTAINER_CLASSNAME = "mx-auto max-w-5xl px-4";

export function Header() {
  return (
    <header className="border-b h-16">
      <div
        className={cn(
          CONTAINER_CLASSNAME,
          "h-full flex items-center justify-between",
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🥸</span>
          <span className="text-2xl font-semibold">Budsjettet</span>
        </div>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          Logg ut
        </Button>
      </div>
    </header>
  );
}
