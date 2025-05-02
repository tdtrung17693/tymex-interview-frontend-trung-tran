/* v8 ignore start */
export const NFT_TIERS = [
  "Basic",
  "Rare",
  "Epic",
  "Legendary",
  "Mythic",
];

export const NFT_PRICE_RANGES = {
  min: 0,
  max: 100,
};

export const NFT_SORTED_FIELDS = {
  price: {
    label: "Price",
    field: "price",
  },
  createdAt: {
    label: "Created date",
    field: "createdAt",
  },
};

export const NFT_SORTED_ORDERS = {
  asc: {
    label: "Ascending",
    order: "asc" as const,
  },
  desc: {
    label: "Descending",
    order: "desc" as const,
  },
};

export const NFT_THEMES = ["Dark", "Halloween", "Light", "Colorful"]

export const NFT_CATEGORIES = [
  "All",
  "Rare",
  "Epic",
  "Lower Body",
  "Mythic",
  "Legendary",
  "Shoes",
  "Upper Body",
  "Hat",
  "Accessory",
];
/* v8 ignore stop */
