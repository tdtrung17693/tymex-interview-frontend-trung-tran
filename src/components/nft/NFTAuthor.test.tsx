import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NFTAuthor from "./NFTAuthor";
import type { Author } from "./ntf.type";

describe("NFTAuthor", () => {
  const mockAuthor: Author = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    gender: "Male",
    avatar: "https://example.com/avatar.jpg",
    onlineStatus: "online",
  };

  it("should render the author's name", () => {
    render(<NFTAuthor author={mockAuthor} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("should render the author's avatar", () => {
    render(<NFTAuthor author={mockAuthor} />);

    const avatarImg = screen.getByAltText("John");
    expect(avatarImg).toBeInTheDocument();
    expect(avatarImg).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("should apply additional className when provided", () => {
    render(<NFTAuthor author={mockAuthor} className="test-class" />);

    const authorElement = screen.getByTestId("nft-author");
    expect(authorElement).toHaveClass("test-class");
    expect(authorElement).toHaveClass("flex");
    expect(authorElement).toHaveClass("items-center");
    expect(authorElement).toHaveClass("gap-2");
  });

  it("should use correct colors for online status", async () => {
    await act(async () => render(<NFTAuthor author={mockAuthor} />));

    const verifiedIcon = screen.getByTestId("verified-icon");
    expect(verifiedIcon).toBeInTheDocument();

    // Verify the colors are applied properly - checking for the linearGradient
    const linearGradient = verifiedIcon?.querySelector("linearGradient");
    expect(linearGradient).toBeInTheDocument();

    // Check that the stops have the correct colors
    const colorStop1 = screen.getByTestId("color-stop-1");
    const colorStop2 = screen.getByTestId("color-stop-2");
    expect(colorStop1).toHaveAttribute("stop-color", "#49DD81");
    expect(colorStop2).toHaveAttribute("stop-color", "#22B4C6");
  });

  it("should use correct colors for offline status", async () => {
    const offlineAuthor = { ...mockAuthor, onlineStatus: "offline" as const };
    await act(async () => render(<NFTAuthor author={offlineAuthor} />));

    const verifiedIcon = screen.getByTestId("verified-icon");
    expect(verifiedIcon).toBeInTheDocument();

    const linearGradient = verifiedIcon?.querySelector("linearGradient");
    expect(linearGradient).toBeInTheDocument();

    const colorStop1 = screen.getByTestId("color-stop-1");
    const colorStop2 = screen.getByTestId("color-stop-2");
    expect(colorStop1).toHaveAttribute("stop-color", "#646464");
    expect(colorStop2).toHaveAttribute("stop-color", "#646464");
  });

  it("should use correct colors for idle status", async () => {
    const idleAuthor = { ...mockAuthor, onlineStatus: "idle" as const };
    await act(async () => render(<NFTAuthor author={idleAuthor} />));

    const verifiedIcon = screen.getByTestId("verified-icon");
    expect(verifiedIcon).toBeInTheDocument();

    const linearGradient = verifiedIcon?.querySelector("linearGradient");
    expect(linearGradient).toBeInTheDocument();

    const colorStop1 = screen.getByTestId("color-stop-1");
    const colorStop2 = screen.getByTestId("color-stop-2");
    expect(colorStop1).toHaveAttribute("stop-color", "#FE955A");
    expect(colorStop2).toHaveAttribute("stop-color", "#F1DA63");
  });
});
