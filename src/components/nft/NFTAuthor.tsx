import { cn } from "@/lib/utils";
import type { Author } from "./ntf.type";
import VerifiedIcon from "./VerifiedIcon";

interface NFTAuthorProps {
  author: Author;
  className?: string;
}

const verifiedIconColors = {
  online: {
    colorStop1: "#49DD81",
    colorStop2: "#22B4C6",
  },
  offline: {
    colorStop1: "#646464",
    colorStop2: "#646464",
  },
  idle: {
    colorStop1: "#FE955A",
    colorStop2: "#F1DA63",
  },
  busy: {
    colorStop1: "#FE5A5A",
    colorStop2: "#F163D2",
  },
};
export default function NFTAuthor({ author, className }: NFTAuthorProps) {
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      data-testid="nft-author"
    >
      <div className="relative rounded-full">
        <img
          src={author.avatar}
          alt={author.firstName}
          className="h-8 w-8 rounded-full bg-white"
        />
        <div className="absolute right-0 bottom-0 h-3 w-3 rounded-full bg-[#17161A] p-0.5">
          <VerifiedIcon
            className="size-full"
            colorStop1={verifiedIconColors[author.onlineStatus].colorStop1}
            colorStop2={verifiedIconColors[author.onlineStatus].colorStop2}
            data-testid="verified-icon"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-semibold">
          {author.firstName} {author.lastName}
        </p>
      </div>
    </div>
  );
}
