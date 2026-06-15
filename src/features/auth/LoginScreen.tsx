import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function LoginScreen() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-md w-full shadow-md rounded-3xl border p-6 space-y-8">
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl">🥸</span>
          <h1 className="text-2xl font-semibold">Velkommen til Budsjettet</h1>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            variant="outline"
            className="gap-3"
            onClick={() =>
              supabase.auth.signInWithOAuth({ provider: "google" })
            }
          >
            Logg inn med Google
            <img src="/google.png" alt="Google" className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
