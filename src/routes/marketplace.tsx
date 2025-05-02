import HeroBlock from "@/components/hero-block/HeroBlock";
import NFTList from "@/components/nft/NFTList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/marketplace")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HeroBlock />
      <NFTList />
    </>
  );
}
