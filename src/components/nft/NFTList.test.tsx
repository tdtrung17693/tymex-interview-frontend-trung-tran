import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NFTList from "./NFTList";
import { NFT_CATEGORIES } from "./ntf.constant";
import { TestRouter } from "@/tests/TestRouter";
import nftData from "@/tests/fixtures/nft.data";
import * as nftHook from "./nft.hook";
import type { NFTItem } from "./ntf.type";
import type { UseNFTParams } from "./nft.hook";

// Mock the hooks
vi.mock("./nft.hook", async () => {
  const actual =
    await vi.importActual<typeof import("./nft.hook")>("./nft.hook");
  return {
    ...actual,
    useNFT: vi.fn(),
  };
});

vi.mock("@/hooks/useDebounce", async () => {
  const actual = await vi.importActual<typeof import("@/hooks/useDebounce")>(
    "@/hooks/useDebounce",
  );
  return {
    ...actual,
    useDebounce: vi.fn((value) => value),
  };
});

vi.mock("./NFTControls", () => ({
  default: ({ onChange }: any) => (
    <div data-testid="nft-controls">
      <button
        data-testid="mock-filter-button"
        onClick={() => onChange({ tier: "Legendary" })}
      >
        Apply Filter
      </button>
    </div>
  ),
}));

vi.mock("./NFTControlsMobile", () => ({
  default: ({ onChange }: any) => (
    <div data-testid="nft-mobile-controls">
      <button
        data-testid="mock-mobile-filter-button"
        onClick={() => onChange({ theme: "Dark" })}
      >
        Apply Mobile Filter
      </button>
    </div>
  ),
}));

// Mock NFTListTabs to avoid Embla Carousel media query issues
vi.mock("./NFTListTabs", () => ({
  default: ({ filter, onChange }: any) => (
    <div data-testid="nft-list-tabs">
      {NFT_CATEGORIES.map((category) => (
        <button
          key={category}
          data-testid={`category-${category}`}
          data-active={
            (!filter.category && category === "All") ||
            filter.category === category
          }
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  ),
}));

describe("NFTList", () => {
  const mockUseNFT = vi.mocked(nftHook.useNFT);
  const mockFetchNextPage = vi.fn();
  const typedNftData = nftData as NFTItem[];

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseNFT.mockReturnValue({
      nftList: typedNftData,
      isPending: false,
      isError: false,
      isFetching: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });
  });

  it("should render NFT cards when data is loaded", async () => {
    render(<NFTList />, { wrapper: TestRouter });

    // Wait for the component to render
    await waitFor(() => {
      expect(screen.getAllByTestId("nft-card")).toHaveLength(
        typedNftData.length,
      );
    });

    // Check if the first NFT card is rendered with correct data
    expect(screen.getByText(typedNftData[0].title)).toBeInTheDocument();
  });

  it("should show loading skeletons when fetching data", async () => {
    mockUseNFT.mockReturnValue({
      nftList: [],
      isPending: false,
      isError: false,
      isFetching: true,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    // Should render 12 skeleton cards during loading
    expect(screen.getAllByTestId("nft-skeleton")).toHaveLength(12);
  });

  it("should show 'No NFTs found' message when no data is available", async () => {
    mockUseNFT.mockReturnValue({
      nftList: [],
      isPending: false,
      isError: false,
      isFetching: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    expect(screen.getByText("No NFTs found")).toBeInTheDocument();
  });

  it("should render categories in the carousel", async () => {
    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    // Check for all category names
    NFT_CATEGORIES.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("should call fetchNextPage when load more button is clicked", async () => {
    mockUseNFT.mockReturnValue({
      nftList: typedNftData,
      isPending: false,
      isError: false,
      isFetching: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });
    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    const loadMoreButton = screen.getByText("Load more");
    fireEvent.click(loadMoreButton);

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it("should not render load more button when hasNextPage is false", async () => {
    mockUseNFT.mockReturnValue({
      nftList: typedNftData,
      isPending: false,
      isError: false,
      isFetching: false,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    expect(screen.queryByText("Load more")).not.toBeInTheDocument();
  });

  it("should update filter when a category is clicked", async () => {
    const useNFTSpy = vi.spyOn(nftHook, "useNFT");

    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    fireEvent.click(screen.getByText("Epic"));

    // Check that useNFT was called with the updated filter
    await waitFor(() => {
      const lastCallArgs =
        useNFTSpy.mock.calls[useNFTSpy.mock.calls.length - 1];
      expect(lastCallArgs).toBeDefined();
      const params = lastCallArgs[0] as UseNFTParams;
      expect(params.filter?.category).toBe("Epic");
    });
  });

  it("should show loading state in load more button when fetchingNextPage", async () => {
    mockUseNFT.mockReturnValue({
      nftList: typedNftData,
      isPending: true,
      isError: false,
      isFetching: true,
      error: null,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: true,
    });

    await act(async () => {
      render(<NFTList />, { wrapper: TestRouter });
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const loadMoreButton = screen.getByText("Loading...");
    expect(loadMoreButton).toBeDisabled();
  });
});
