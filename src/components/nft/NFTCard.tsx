import { cn } from "@/lib/utils";
import type { NFTItem } from "./ntf.type";
import NFTAuthor from "./NFTAuthor";
import { HeartIcon } from "lucide-react";
import { useState } from "react";
interface NFTCardProps {
  nft: NFTItem;
}
export default function NFTCard({ nft }: NFTCardProps) {
  const [isFavorite, setIsFavorite] = useState(nft.isFavorite);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div
      className="flex flex-col rounded-2xl bg-[#3A3841] p-2 lg:p-4"
      data-testid="nft-card"
    >
      <div
        className={cn(
          "relative aspect-square flex-shrink-1 flex-grow-0 rounded-xl bg-gradient-to-r pt-14",
          getTierBackground(nft.tier),
        )}
      >
        <img
          src={getImageUrl(nft)}
          alt={nft.title}
          className="h-full w-full object-contain"
        />
        <div className="absolute top-0 right-0 left-0 flex items-center justify-between p-2 select-none">
          <div className="rounded bg-[#313B4580] px-3 py-1 text-xs font-medium">
            {nft.tier}
          </div>
          <HeartIcon
            data-testid="heart-icon"
            className={cn(
              "size-6 cursor-pointer",
              isFavorite && "animate-favorite-micro-interaction fill-white",
            )}
            onClick={toggleFavorite}
          />
        </div>
      </div>
      <div className="mt-4 mb-4 flex flex-col items-start justify-between sm:flex-row lg:mt-6">
        <p className="text-sm font-semibold">{nft.title}</p>
        <div className="flex flex-shrink-0 items-center gap-2 text-sm font-medium">
          <img src="eth.svg" />
          <span>{nft.price} ETH</span>
        </div>
      </div>
      <NFTAuthor className="mt-auto" author={nft.author} />
    </div>
  );
}

function getImageUrl(nft: NFTItem) {
  const titleSlug = nft.title.toLowerCase().replace(/ /g, "-");
  return `/characters/${titleSlug}.png`;
}

function getTierBackground(tier: NFTItem["tier"]) {
  switch (tier) {
    case "Basic":
      return "from-[#49DD81] to-[#22B4C6]";
    case "Legendary":
      return "from-[#FE955A] to-[#F1DA63]";
    case "Mythic":
      return "from-[#FE5A5A] to-[#F163D2]";
    case "Epic":
      return "from-[#DD5AFE] to-[#6366F1]";
    case "Rare":
      return "from-[#43A6F6] to-[#5868F3]";
    default:
      return "bg-gray-100";
  }
}
