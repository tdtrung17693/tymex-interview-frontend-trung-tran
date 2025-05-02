import type { NFTItem } from "@/components/nft/ntf.type";
import { env } from "@/lib/env";
import type { ApiResponse } from "@/types/api";
import queryString from "qs";
export interface NftFilter  {
  category?: string;
  theme?: string;
  tier?: string;
  isFavorite?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  titlePattern?: string;
};

interface NftNormalizedFilter  {
  category?: string;
  theme?: string;
  tier?: string;
  isFavorite?: boolean;
  price_gte?: number;
  price_lte?: number;
  title_like?: string;
}
export type Pagination = {
  page?: number;
  limit?: number;
};

export type FetchNFTsSort = {
  field?: string;
  order?: "asc" | "desc";
};

type NftNormalizedSort = {
  _sort?: string;
  _order?: "asc" | "desc";
};

export type FetchNFTsParams = {
  filter?: NftFilter;
  pagination?: Pagination;
  sort?: FetchNFTsSort;
  options?: {
    simulateSlowResponse?: boolean;
  }
};

type FetchNFTsResponse = ApiResponse<NFTItem[]>;

function normalizeFilter(filter: NftFilter | undefined): NftNormalizedFilter {
  if (!filter) return {};
  const normalizedFilter: NftNormalizedFilter = {  };
  if (filter?.category) normalizedFilter.category = filter.category;
  if (filter?.theme) normalizedFilter.theme = filter.theme;
  if (filter?.tier) normalizedFilter.tier = filter.tier;
  if (filter?.isFavorite) normalizedFilter.isFavorite = filter.isFavorite;
  if (filter?.priceRange) {
    if (filter.priceRange.min) normalizedFilter.price_gte = filter.priceRange.min;
    if (filter.priceRange.max) normalizedFilter.price_lte = filter.priceRange.max;
  }
  if (filter?.titlePattern) normalizedFilter.title_like = filter.titlePattern;
  return normalizedFilter;
}

function normalizeSort(sort: FetchNFTsSort | undefined): NftNormalizedSort {
  if (!sort) return {};
  return {
    _sort: sort.field,
    _order: sort.order,
  };
}

const fetchNFTs = async ({ filter, pagination, sort, options = {}}: FetchNFTsParams): Promise<FetchNFTsResponse> => {
  const apiUrl = env.VITE_NFT_API_URL;
  const normalizedFilter: NftNormalizedFilter = normalizeFilter(filter);
  const normalizedSort = normalizeSort(sort);
  const paginationParams = {
    _page: pagination?.page,
    _limit: pagination?.limit,
  };
  const params = { ...normalizedFilter, ...paginationParams, ...normalizedSort };

  const url = `${apiUrl}?${queryString.stringify(params)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch NFTs: ${response.status} ${response.statusText}`);
    }

    if (options?.simulateSlowResponse) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const data: FetchNFTsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    throw error;
  }
};

export const nftService = {
  fetchNFTs,
}; 
