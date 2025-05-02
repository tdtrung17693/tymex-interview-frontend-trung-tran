import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

import { nftService } from "@/services/nft.service";
import { useNFT } from "./nft.hook";
import type { NFTItem } from "./ntf.type";
import nftData from "@/tests/fixtures/nft.data";

vi.mock("@/services/nft.service", () => ({
  nftService: {
    fetchNFTs: vi.fn(),
  },
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const createWrapper = (client: QueryClient) => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
};

// Type assertion for the mocked function (using Vitest's Mock type)
const mockedFetchNFTs = nftService.fetchNFTs as ReturnType<typeof vi.fn>;

describe("useNFT Hook", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    mockedFetchNFTs.mockClear();
  });

  afterEach(() => {
    queryClient.clear();
    vi.restoreAllMocks();
  });

  it("should return initial loading state", () => {
    const wrapper = createWrapper(queryClient);
    const { result } = renderHook(() => useNFT(), { wrapper });

    expect(result.current.isPending).toBe(true);
    expect(result.current.nftList).toEqual([]);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();

    expect(result.current.hasNextPage).toBe(false);
  });

  it("should return data successfully after fetching", async () => {
    const mockPage1: {
      data: NFTItem[];
      pagination: { page: number; total: number; limit: number };
    } = {
      data: nftData.slice(0, 2) as NFTItem[],
      pagination: { page: 1, total: 2, limit: 10 },
    };
    mockedFetchNFTs.mockResolvedValueOnce(mockPage1);

    const wrapper = createWrapper(queryClient);
    const { result } = renderHook(() => useNFT(), { wrapper });

    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.nftList).toEqual(mockPage1.data);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should handle fetch errors", async () => {
    const errorMessage = "Failed to fetch NFTs";
    mockedFetchNFTs.mockRejectedValueOnce(new Error(errorMessage));

    const wrapper = createWrapper(queryClient);
    const { result } = renderHook(() => useNFT(), { wrapper });

    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe(errorMessage);
    expect(result.current.nftList).toEqual([]);
    expect(result.current.hasNextPage).toBe(false);
    expect(mockedFetchNFTs).toHaveBeenCalledTimes(1);
  });

  it("should fetch next page when fetchNextPage is called", async () => {
    const mockPage1 = {
      data: nftData.slice(0, 2),
      pagination: { page: 1, total: 4, limit: 2 },
    };
    const mockPage2 = {
      data: nftData.slice(2, 4),
      pagination: { page: 2, total: 4, limit: 2 },
    };
    mockedFetchNFTs.mockResolvedValueOnce(mockPage1);

    const wrapper = createWrapper(queryClient);
    const { result } = renderHook(() => useNFT({ pagination: { limit: 2 } }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(result.current.hasNextPage).toBe(true);
    expect(result.current.nftList).toHaveLength(2);

    mockedFetchNFTs.mockResolvedValueOnce(mockPage2);
    result.current.fetchNextPage();
    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(result.current.nftList).toHaveLength(4);
    expect(result.current.nftList).toEqual([
      ...mockPage1.data,
      ...mockPage2.data,
    ]);

    await waitFor(() => expect(result.current.hasNextPage).toBe(false));

    expect(mockedFetchNFTs).toHaveBeenCalledTimes(2);
    expect(mockedFetchNFTs).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        filter: {},
        sort: {},
        pagination: {
          page: 1,
          limit: 2,
        },
      }),
    );
    expect(mockedFetchNFTs).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        filter: {},
        sort: {},
        pagination: {
          page: 2,
          limit: 2,
        },
      }),
    );
  });

  it("should use filter and pagination parameters in query key and fetch function", async () => {
    const mockFilter = { category: "Art" };
    const mockPagination = { limit: 10, page: 1 };
    const mockPage1 = {
      data: nftData
        .filter((nft) => nft.category === mockFilter.category)
        .slice(0, 2),
      pagination: { page: 1, total: 2, limit: 10 },
    };
    mockedFetchNFTs.mockResolvedValueOnce(mockPage1);

    const wrapper = createWrapper(queryClient);
    const { result } = renderHook(
      () => useNFT({ filter: mockFilter, pagination: mockPagination }),
      { wrapper },
    );

    expect(result.current.nftList).toEqual(mockPage1.data);
    // Verify the service was called with the correct parameters
    expect(mockedFetchNFTs).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        filter: mockFilter,
        pagination: mockPagination,
        sort: {},
      }),
    );
  });
});
