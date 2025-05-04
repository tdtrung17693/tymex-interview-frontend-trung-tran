import { createFileRoute } from "@tanstack/react-router";
import UnderConstruction from "@/components/UnderConstruction";
export const Route = createFileRoute("/whitepaper")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UnderConstruction />;
}
