import {
  nftService,
  type FetchNFTsSort,
  type NftFilter,
  type Pagination,
} from "@/services/nft.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { NFTItem } from "./ntf.type";

const nftQueryKeys = {
  list: (filter?: NftFilter, sort?: FetchNFTsSort, pagination?: Pagination) =>
    ["nfts", { filter, sort, pagination }] as const,
};

type UseNFT = (params?: UseNFTParams) => UseNFTResult;

export interface UseNFTParams {
  filter?: NftFilter;
  sort?: FetchNFTsSort;
  pagination?: { limit: number };
  options?: {
    simulateSlowResponse?: boolean;
  };
}

interface UseNFTResult {
  nftList: NFTItem[];
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const DEFAULT_PAGINATION = { limit: 10 };

export const useNFT: UseNFT = (params: UseNFTParams = {}): UseNFTResult => {
  const {
    data,
    isPending,
    isError,
    error,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: nftQueryKeys.list(params.filter, params.sort, params.pagination),
    queryFn: ({ pageParam = 0 }) =>
      nftService.fetchNFTs({
        filter: params.filter || {},
        sort: params.sort || {},
        pagination: {
          page: pageParam,
          limit: params.pagination?.limit ?? DEFAULT_PAGINATION.limit,
        },
        options: params.options,
      }),
    getNextPageParam: (lastPageData) => {
      if (
        lastPageData.pagination.page * lastPageData.pagination.limit >=
        lastPageData.pagination.total
      ) {
        return undefined;
      }
      return lastPageData.pagination.page + 1;
    },
    initialPageParam: 1,
  });

  const nftList = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  return useMemo(
    () => ({
      nftList,
      isPending,
      isFetching,
      isError,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    }),
    [
      nftList,
      isPending,
      isFetching,
      isError,
      error,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    ],
  );
};
