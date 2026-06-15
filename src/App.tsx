import { useState } from "react";
import { Button } from "./components/ui/button";
import { cn } from "./lib/utils";

const CONTAINER_CLASSNAME = "mx-auto max-w-5xl px-4";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md w-full shadow-md rounded-3xl border p-6 space-y-8">
          <div className="flex flex-col items-center gap-4">
            <span className="text-6xl">🥸</span>
            <h1 className="text-2xl font-semibold">Velkommen til Budsjettet</h1>
          </div>

          <div className="flex flex-col gap-4">
            <Button size="lg" variant="outline" className="gap-3">
              Logg inn med Google
              <img src="/google.png" alt="Google" className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-svh w-full">
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
        </div>
      </header>
      <main className={CONTAINER_CLASSNAME}>
        <section>
          <Button>Click me</Button>
        </section>
      </main>
    </div>
  );
}

export default App;
