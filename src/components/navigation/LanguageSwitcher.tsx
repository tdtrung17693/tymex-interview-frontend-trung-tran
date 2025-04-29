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
      <SelectTrigger className="w-[100px]">
        <Globe className="size-4" />
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="vi">VI</SelectItem>
      </SelectContent>
    </Select>
  );
}
