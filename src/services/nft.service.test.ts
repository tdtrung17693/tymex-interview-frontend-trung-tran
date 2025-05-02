import nftData from "@/tests/fixtures/nft.data";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nftService } from "./nft.service";
const fetch = vi.fn();
global.fetch = fetch;
function mockSuccessFetchResponse(data: object) {
  fetch.mockResolvedValue({
    ok: true,
    json: vi.fn().mockResolvedValue(data),
  });
}

function mockFailedFetchResponse() {
    fetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error"
    });
}

function mockErrorFetchResponse() {
    fetch.mockRejectedValue(new Error("Failed to fetch NFTs"));
}
describe("useNFT", () => {
  beforeEach(() => {});
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("should return the nft list", async () => {
    mockSuccessFetchResponse(nftData)
    const result = await nftService.fetchNFTs({});
    expect(result).toBeDefined();
  });
  it("should return the nft list with filter", async () => {
    const filteredData = nftData.filter(item => item.category === "Epic");
    mockSuccessFetchResponse({
        data: filteredData,
        pagination: {
            total: filteredData.length
        }
    })
    const result = await nftService.fetchNFTs({
      filter: {
        category: "Epic",
      },
    });
    expect(result).toBeDefined();
    expect(fetch).toHaveBeenCalledWith(`/api?category=Epic`);
    expect(result.data.length).toBe(filteredData.length);
  });
  it("should return an error when there is an error response", async () => {
    mockErrorFetchResponse();
    await expect(nftService.fetchNFTs({})).rejects.toThrowError(`Failed to fetch NFTs`);
  });
  it("should return an error when there is an unexpected error", async () => {
    mockFailedFetchResponse();
    await expect(nftService.fetchNFTs({})).rejects.toThrowError(`Failed to fetch NFTs: 500 Internal Server Error`);
  });
});
