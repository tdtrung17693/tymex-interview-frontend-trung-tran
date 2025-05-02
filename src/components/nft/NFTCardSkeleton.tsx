/* v8 ignore start */
import { Skeleton } from "../ui/skeleton";

export default function NFTCardSkeleton() {
  return (
    <div className="rounded-2xl bg-[#3A384199] p-4" data-testid="nft-skeleton">
      <div className="relative aspect-square flex-shrink-1 flex-grow-0 rounded-xl bg-gradient-to-r">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="mt-6 flex justify-between">
        <Skeleton className="h-4 w-full" />
      </div>
      <Skeleton className="mt-4 h-4 w-24" />
    </div>
  );
}
/* v8 ignore stop */
