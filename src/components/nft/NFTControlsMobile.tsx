import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent } from "../ui/drawer";
import { useState } from "react";
import NFTControls, { type NFTControlsProps } from "./NFTControls";
import { cn } from "@/lib/utils";

export interface NFTControlsMobileProps extends NFTControlsProps {
  className?: string;
}

export default function NFTControlsMobile(props: NFTControlsMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("sticky bottom-0 w-full", props.className)}>
      <Button
        className="absolute right-0 bottom-4 aspect-square h-12 w-12 rounded-full"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="size-6" />
      </Button>

      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        shouldScaleBackground={true}
      >
        <DrawerContent>
          <div className="overflow-y-auto p-4">
            <NFTControls {...props} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
