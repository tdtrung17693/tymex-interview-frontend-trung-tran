import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <Button asChild>
        <Link
          to="/marketplace"
          className="font-squada-one group size-auto h-auto w-auto min-w-56 py-4 text-xl uppercase"
        >
          Go to Marketplace{" "}
          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
