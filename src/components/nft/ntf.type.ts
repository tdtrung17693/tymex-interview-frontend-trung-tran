export interface Author {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  avatar: string;
  onlineStatus: "online" | "offline" | "idle";
}

export interface NFTItem {
  id: number;
  title: string;
  category:
    | "Upper Body"
    | "Lower Body"
    | "Hat"
    | "Shoes"
    | "Accessory"
    | "Legendary"
    | "Mythic"
    | "Epic"
    | "Rare";
  price: number;
  isFavorite: boolean;
  createdAt: number;
  theme: "Dark" | "Light" | "Colorful" | "Halloween";
  tier: "Rare" | "Basic" | "Legendary" | "Mythic" | "Epic";
  imageId: number; // 1 -> 20 (integer)
  author: Author;
}
