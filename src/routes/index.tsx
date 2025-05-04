import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex h-full items-center justify-center">
      <Button
        asChild
        className="font-squada-one group size-auto h-auto w-auto min-w-40 px-16 py-4 text-xl uppercase"
      >
        <Link to="/marketplace">
          Go to Marketplace{" "}
          <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}
