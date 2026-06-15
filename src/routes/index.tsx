import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth";
import { LoginScreen } from "@/features/auth/LoginScreen";
import { Header } from "@/features/layout/Header";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const CONTAINER_CLASSNAME = "mx-auto max-w-5xl px-4";

function Index() {
  const session = useSession();

  if (!session) return <LoginScreen />;

  return (
    <div className="grid min-h-svh w-full">
      <Header />
      <main className={CONTAINER_CLASSNAME}>
        <section>
          <Button>Click me</Button>
        </section>
      </main>
    </div>
  );
}
