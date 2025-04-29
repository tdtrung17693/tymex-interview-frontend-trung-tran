import { createFileRoute } from "@tanstack/react-router";
import UnderConstruction from "@/components/UnderConstruction";
export const Route = createFileRoute("/roadmap")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="container">
      <UnderConstruction />
    </div>
  );
}
