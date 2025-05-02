import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NFTCard from "./NFTCard";
import type { NFTItem } from "./ntf.type";

vi.mock("./NFTAuthor", () => ({
  default: ({ author, className }: { author: any; className?: string }) => (
    <div data-testid="nft-author" className={className}>
      {author.firstName} {author.lastName}
    </div>
  ),
}));

describe("NFTCard", () => {
  const mockNFT: NFTItem = {
    id: 1,
    title: "Cyber Punk",
    category: "Epic",
    price: 120.5,
    isFavorite: false,
    createdAt: 1624533946000,
    theme: "Dark",
    tier: "Legendary",
    imageId: 8,
    author: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      gender: "Male",
      avatar: "https://example.com/avatar.jpg",
      onlineStatus: "online",
    },
  };

  it("should render the NFT title", () => {
    render(<NFTCard nft={mockNFT} />);
    expect(screen.getByText("Cyber Punk")).toBeInTheDocument();
  });

  it("should render the NFT price with ETH", () => {
    render(<NFTCard nft={mockNFT} />);
    expect(screen.getByText("120.5 ETH")).toBeInTheDocument();
  });

  it("should render the NFT tier", () => {
    render(<NFTCard nft={mockNFT} />);
    expect(screen.getByText("Legendary")).toBeInTheDocument();
  });

  it("should render the NFT image with correct source", () => {
    render(<NFTCard nft={mockNFT} />);

    const image = screen.getByAltText("Cyber Punk");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/characters/cyber-punk.png");
  });

  it("should render the NFTAuthor component with author and className", () => {
    render(<NFTCard nft={mockNFT} />);

    const authorComponent = screen.getByTestId("nft-author");
    expect(authorComponent).toBeInTheDocument();
    expect(authorComponent).toHaveTextContent("John Doe");
  });

  it("should toggle favorite state when heart icon is clicked", () => {
    render(<NFTCard nft={mockNFT} />);

    const heartIcon = screen.getByTestId("heart-icon");
    expect(heartIcon).toBeInTheDocument();
    expect(heartIcon).not.toHaveClass("fill-white");

    fireEvent.click(heartIcon);
    expect(heartIcon).toHaveClass("fill-white");

    fireEvent.click(heartIcon);
    expect(heartIcon).not.toHaveClass("fill-white");
  });

  it("should initialize with isFavorite true when NFT has isFavorite true", () => {
    const favoriteNFT = { ...mockNFT, isFavorite: true };
    render(<NFTCard nft={favoriteNFT} />);

    const heartIcon = screen.getByTestId("heart-icon");
    expect(heartIcon).toHaveClass("fill-white");
  });

  it("should apply the correct tier background", () => {
    render(<NFTCard nft={mockNFT} />);

    const container = screen.getByAltText("Cyber Punk").closest("div");
    expect(container).toHaveClass("from-[#FE955A]");
    expect(container).toHaveClass("to-[#F1DA63]");
  });
});
