import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/lib/auth";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";

const CONTAINER_CLASSNAME = "mx-auto max-w-5xl px-4";

function UserMenu() {
  const session = useSession();
  const user = session?.user;
  const name = user?.user_metadata?.full_name ?? user?.email ?? "";
  const avatar = user?.user_metadata?.avatar_url;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2.5 rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="size-7 rounded-full object-cover"
            />
          ) : (
            <div className="size-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="hidden md:block text-sm font-medium">{name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-48 p-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={() => supabase.auth.signOut()}
        >
          <LogOut className="size-4" />
          Logg ut
        </Button>
      </PopoverContent>
    </Popover>
  );
}

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
        <UserMenu />
      </div>
    </header>
  );
}
