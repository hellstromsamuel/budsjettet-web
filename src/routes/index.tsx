import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/lib/auth";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { Header } from "@/components/layout/Header";
import { TransactionsSection } from "@/features/transactions/TransactionsSection";

export const Route = createFileRoute("/")({
  component: Index,
});

const CONTAINER_CLASSNAME = "mx-auto max-w-5xl w-full px-4";

function Index() {
  const session = useSession();

  if (!session) return <LoginScreen />;

  return (
    <div className="grid w-full overflow-y-auto">
      <Header />
      <main className={CONTAINER_CLASSNAME}>
        <TransactionsSection />
      </main>
    </div>
  );
}
