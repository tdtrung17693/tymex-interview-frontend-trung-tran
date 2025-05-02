import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselItem,
  CarouselContent,
  type CarouselApi,
} from "../ui/carousel";
import { NFT_CATEGORIES } from "./ntf.constant";
import type { NftFilter } from "@/services/nft.service";
import { useEffect, useState } from "react";
import { useMemoizeFunction } from "@/hooks/useMemoizeFunction";
function isActiveCategory(category: string, filter: Partial<NftFilter>) {
  return (
    (!filter.category && category === "All") || filter.category === category
  );
}

interface NFTListTabsProps {
  filter: Partial<NftFilter>;
  onChange: (category: string) => void;
}

export default function NFTListTabs({ filter, onChange }: NFTListTabsProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [haveNext, setHaveNext] = useState(false);
  const [havePrev, setHavePrev] = useState(false);

  const handleSelect = useMemoizeFunction(() => {
    setHaveNext(api?.canScrollNext?.() ?? false);
    setHavePrev(api?.canScrollPrev?.() ?? false);
  });

  const initCarousel = useMemoizeFunction(() => {
    if (api) {
      api.on("select", handleSelect);
      setHaveNext(api.canScrollNext());
      setHavePrev(api.canScrollPrev());

      window.addEventListener("resize", handleSelect);
    }
    return () => {
      api?.off("select", handleSelect);
      window.removeEventListener("resize", handleSelect);
    };
  });

  useEffect(() => {
    return initCarousel();
  }, [api]);

  return (
    <div className="relative mt-10 mb-10 select-none lg:mt-0">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="ml-0 gap-2">
          {NFT_CATEGORIES.map((category) => (
            <CarouselItem
              key={category}
              className="flex h-[48px] flex-shrink-0 basis-auto items-center pr-2 pl-0"
            >
              <div
                className={cn(
                  "px-4 py-2",
                  "bg-gradient-to-r from-[#DA458F]/50 to-[#DA34DD]/50 text-sm font-bold text-white",
                  "rounded",
                  "cursor-pointer select-none",
                  isActiveCategory(category, filter) &&
                    "from-gradient-stop-1 to-gradient-stop-2",
                )}
                onClick={() => onChange(category)}
              >
                {category}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {havePrev && (
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#08122a] to-transparent" />
      )}

      {/* Right gradient shadow */}
      {haveNext && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#08122a] to-transparent" />
      )}
    </div>
  );
}
