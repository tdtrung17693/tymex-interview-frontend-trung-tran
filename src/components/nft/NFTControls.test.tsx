import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NFTControls from "./NFTControls";

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);
describe("NFTControls", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("should render the search input", () => {
    render(<NFTControls onChange={mockOnChange} />);

    const searchInput = screen.getByPlaceholderText("Quick search");
    expect(searchInput).toBeInTheDocument();
  });

  it("should render the price range slider", () => {
    render(<NFTControls onChange={mockOnChange} />);

    const sliderThumbs = screen.getAllByRole("slider");
    expect(sliderThumbs.length).toBe(2);
  });

  it("should render the tier select", () => {
    render(<NFTControls onChange={mockOnChange} />);

    expect(screen.getByText("Tier")).toBeInTheDocument();
    const selectTier = screen.getByTestId("tier-select");
    expect(selectTier).toBeInTheDocument();
  });

  it("should render the theme select", () => {
    render(<NFTControls onChange={mockOnChange} />);

    expect(screen.getByText("Theme")).toBeInTheDocument();
    const selectTheme = screen.getByTestId("theme-select");
    expect(selectTheme).toBeInTheDocument();
  });

  it("should render the sort by select", () => {
    render(<NFTControls onChange={mockOnChange} />);

    expect(screen.getByText("Sort by")).toBeInTheDocument();
    const selectSort = screen.getByTestId("sort-field-select");
    expect(selectSort).toBeInTheDocument();
  });

  it("should render the sort order select", () => {
    render(<NFTControls onChange={mockOnChange} />);

    expect(screen.getByText("Sort order")).toBeInTheDocument();
    const selectOrder = screen.getByTestId("sort-order-select");
    expect(selectOrder).toBeInTheDocument();
  });

  it("should call onChange with titlePattern when search input changes", () => {
    render(<NFTControls onChange={mockOnChange} />);

    const searchInput = screen.getByPlaceholderText("Quick search");
    fireEvent.change(searchInput, { target: { value: "test search" } });

    expect(mockOnChange).toHaveBeenCalledWith({
      titlePattern: "test search",
    });
  });

  it("should display correct values when props are provided", () => {
    const props = {
      onChange: mockOnChange,
      priceRange: { min: 10, max: 100 },
      tier: "Legendary",
      theme: "Dark",
      sortField: "price",
      sortOrder: "asc" as const,
      titlePattern: "cyber",
    };

    render(<NFTControls {...props} />);

    const searchInput = screen.getByPlaceholderText("Quick search");
    expect(searchInput).toHaveValue("cyber");
  });

  it("should apply additional className when provided", () => {
    const { container } = render(
      <NFTControls onChange={mockOnChange} className="test-class" />,
    );

    const controlsElement = container.firstChild as HTMLElement;
    expect(controlsElement).toHaveClass("test-class");
    expect(controlsElement).toHaveClass("flex");
    expect(controlsElement).toHaveClass("flex-col");
  });
});
