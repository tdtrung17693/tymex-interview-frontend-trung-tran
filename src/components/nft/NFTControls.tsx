import { cn } from "@/lib/utils";
import type { BaseComponentProps } from "@/types/common";
import { CircleX, Search } from "lucide-react";
import { useCallback } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DualRangeSlider } from "../ui/range-slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  NFT_SORTED_FIELDS,
  NFT_SORTED_ORDERS,
  NFT_THEMES,
  NFT_TIERS,
} from "./ntf.constant";

export interface NFTControlValues {
  priceRange: {
    min: number;
    max: number;
  };
  tier: string;
  theme: string;
  sortField: string;
  sortOrder: "asc" | "desc";
  titlePattern: string;
}
export type NFTControlOnChangeArgs = Partial<NFTControlValues>;
export type NFTControlsProps = BaseComponentProps<{
  onChange: (args: NFTControlOnChangeArgs) => void;
  disabled?: boolean;
  loading?: boolean;
}> &
  Partial<NFTControlValues>;

export default function NFTControls({
  onChange,
  className,
  loading,
  ...values
}: NFTControlsProps) {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({
        titlePattern: e.target.value,
      });
    },
    [onChange],
  );

  const handleReset = useCallback(() => {
    onChange({
      priceRange: { min: 0, max: 200 },
      tier: "all",
      theme: "all",
      sortField: NFT_SORTED_FIELDS.createdAt.field,
      sortOrder: NFT_SORTED_ORDERS.desc.order,
      titlePattern: "",
    });
  }, [onChange]);

  const handlePriceChange = useCallback(
    (value: number[]) => {
      onChange({
        priceRange: {
          min: value[0],
          max: value[1],
        },
      });
    },
    [onChange],
  );

  const handleTierChange = useCallback(
    (value: string) => {
      onChange({
        tier: value,
      });
    },
    [onChange],
  );

  const handleThemeChange = useCallback(
    (value: string) => {
      onChange({
        theme: value,
      });
    },
    [onChange],
  );

  const handleSortFieldChange = useCallback(
    (value: string) => {
      onChange({
        sortField: value,
      });
    },
    [onChange],
  );

  const handleSortOrderChange = useCallback(
    (value: string) => {
      onChange({
        sortOrder: value as "asc" | "desc",
      });
    },
    [onChange],
  );

  return (
    <div className={cn("relative flex flex-col gap-4 space-y-4", className)}>
      <div className="flex flex-col gap-10">
        <div className="focus-within:ring-primary focus-within:border-ring focus-within:ring-ring/50 border-input flex items-center gap-2 rounded-md border px-4 focus-within:ring-[3px]">
          <Search className="text-muted-foreground size-6" />
          <Input
            type="text"
            placeholder="Quick search"
            className="border-none focus-visible:ring-0"
            value={values.titlePattern}
            onChange={handleTitleChange}
            disabled={loading}
          />
        </div>
        <div>
          <Label className="text-label mb-6 font-semibold uppercase">
            Price
          </Label>
          <DualRangeSlider
            label={(value) => `${value} ETH`}
            value={[values.priceRange?.min || 0, values.priceRange?.max || 200]}
            onValueChange={handlePriceChange}
            min={0}
            max={200}
            step={0.01}
            labelPosition="bottom"
            minStepsBetweenThumbs={0.01}
            showMinMaxLabel={true}
            disabled={loading}
          />
        </div>
        <div>
          <Label className="text-label mb-6 font-semibold uppercase">
            Tier
          </Label>
          <Select
            value={values.tier || "all"}
            onValueChange={handleTierChange}
            disabled={loading}
          >
            <SelectTrigger className="w-full" data-testid="tier-select">
              <SelectValue placeholder="Select a tier" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all">All</SelectItem>
              {NFT_TIERS.map((tier) => (
                <SelectItem key={tier} value={tier}>
                  {tier}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-label mb-6 font-semibold uppercase">
            Theme
          </Label>
          <Select
            value={values.theme || "all"}
            onValueChange={handleThemeChange}
            disabled={loading}
          >
            <SelectTrigger className="w-full" data-testid="theme-select">
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="all">All</SelectItem>
              {NFT_THEMES.map((theme) => (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-label mb-6 font-semibold uppercase">
            Sort by
          </Label>
          <Select
            value={values.sortField || Object.keys(NFT_SORTED_FIELDS)[0]}
            onValueChange={handleSortFieldChange}
            disabled={loading}
          >
            <SelectTrigger className="w-full" data-testid="sort-field-select">
              <SelectValue placeholder="Select a sort field" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {Object.entries(NFT_SORTED_FIELDS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-label mb-6 font-semibold uppercase">
            Sort order
          </Label>
          <Select
            value={values.sortOrder || Object.keys(NFT_SORTED_ORDERS)[0]}
            onValueChange={handleSortOrderChange}
            disabled={loading}
          >
            <SelectTrigger className="w-full" data-testid="sort-order-select">
              <SelectValue placeholder="Select a sort order" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {Object.entries(NFT_SORTED_ORDERS).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-start">
          <Button
            className="flex cursor-pointer items-center gap-2 !px-0"
            data-testid="reset-button"
            variant="link"
            onClick={handleReset}
            disabled={loading}
          >
            <CircleX className="size-4 text-[#FBC625]" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
