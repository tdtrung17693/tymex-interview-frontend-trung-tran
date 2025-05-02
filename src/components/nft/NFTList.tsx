import { useDebounce } from "@/hooks/useDebounce";
import { useMemoizeFunction } from "@/hooks/useMemoizeFunction";
import type { FetchNFTsSort, NftFilter } from "@/services/nft.service";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { useNFT, type UseNFTParams } from "./nft.hook";
import NFTCard from "./NFTCard";
import NFTCardSkeleton from "./NFTCardSkeleton";
import NFTControls, { type NFTControlOnChangeArgs } from "./NFTControls";
import NFTListTabs from "./NFTListTabs";
import { cn } from "@/lib/utils";
import NFTMobileControls from "./NFTControlsMobile";

const DEFAULT_SORT = {
  field: "createdAt",
  order: "desc" as const,
};

export default function NFTList() {
  const [filter, setFilter] = useState<Partial<NftFilter>>({});
  const [sort, setSort] = useState<FetchNFTsSort>(DEFAULT_SORT);
  const params = useMemo(
    () => ({ filter, sort, pagination: { limit: 20 } }),
    [filter, sort],
  );

  const debouncedParams = useDebounce<UseNFTParams>(params, 300);
  const { nftList, isPending, hasNextPage, fetchNextPage, isFetching } = useNFT(
    { ...debouncedParams, options: { simulateSlowResponse: true } },
  );

  const handleCategoryChange = useMemoizeFunction((category: string) => {
    setFilter({
      ...filter,
      category: category === "All" ? undefined : category,
    });
  });

  const handleControlsChange = useMemoizeFunction(
    (args: NFTControlOnChangeArgs) => {
      if (args.sortField || args.sortOrder) {
        const newSort = { ...sort };
        if (args.sortField) {
          newSort.field = args.sortField;
        }
        if (args.sortOrder) {
          newSort.order = args.sortOrder;
        }
        setSort(newSort);
      }

      const newFilter = { ...filter } as Partial<NftFilter>;

      if (args.priceRange) {
        newFilter.priceRange = {
          min: args.priceRange.min,
          max: args.priceRange.max,
        };
      }

      (["tier", "theme", "titlePattern"] as const).forEach((key) => {
        if (args[key] !== undefined) {
          if (args[key] === "all") {
            delete newFilter[key];
          } else {
            newFilter[key] = args[key];
          }
        }
      });

      setFilter(newFilter);
    },
  );

  return (
    <div className="bg-[url('/nft-list-background.png')] bg-cover bg-center">
      <div
        className={cn(
          "container flex flex-col justify-between gap-10 px-4 pt-10",
          "lg:flex-row",
          "xl:px-50 xl:pt-40 xl:pb-14",
        )}
      >
        <NFTControls
          onChange={handleControlsChange}
          className="hidden w-1/4 xl:block"
          priceRange={filter?.priceRange}
          tier={filter?.tier}
          theme={filter?.theme}
          sortField={sort.field}
          sortOrder={sort.order}
          titlePattern={filter?.titlePattern}
          loading={isFetching}
        />
        <div className="@container relative flex w-full flex-1 flex-col gap-4">
          <NFTListTabs filter={filter} onChange={handleCategoryChange} />
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 @min-3xl:grid-cols-4 @min-5xl:gap-10">
              {!isPending &&
                nftList?.map((nft) => <NFTCard key={nft.id} nft={nft} />)}
              {!isPending && nftList?.length === 0 && (
                <div className="col-span-4">No NFTs found</div>
              )}
              {isFetching &&
                Array.from({
                  length: getSkeletonCount(nftList?.length || 0),
                }).map((_, index) => <NFTCardSkeleton key={index} />)}
            </div>

            <NFTMobileControls
              className="block xl:hidden"
              onChange={handleControlsChange}
              priceRange={filter?.priceRange}
              tier={filter?.tier}
              theme={filter?.theme}
              sortField={sort.field}
              sortOrder={sort.order}
              titlePattern={filter?.titlePattern}
              loading={isFetching}
            />
          </div>
          {hasNextPage && (
            <div className="mt-12 flex justify-center">
              <Button
                className="h-16 w-80"
                onClick={() => fetchNextPage()}
                disabled={isFetching}
              >
                {isFetching ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="h-[418px] w-full bg-[url('/nft-list-bottom-background.svg')] bg-cover bg-center" />
    </div>
  );
}

function getSkeletonCount(nftListLength: number): number {
  return 4 - (nftListLength % 4) + 8;
}
