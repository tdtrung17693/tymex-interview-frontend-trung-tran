import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[100px] border-none bg-black/20">
        <Globe className="size-4" />
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="text-white">
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="vi">VI</SelectItem>
      </SelectContent>
    </Select>
  );
}
