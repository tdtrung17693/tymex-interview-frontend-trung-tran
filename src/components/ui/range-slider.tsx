"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { useState, useEffect, useRef } from "react";

interface DualRangeSliderProps
  extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
  showMinMaxLabel?: boolean;
}

const DualRangeSlider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    {
      className,
      label,
      labelPosition = "top",
      showMinMaxLabel = true,
      ...props
    },
    ref,
  ) => {
    const initialValue = Array.isArray(props.value)
      ? props.value
      : [props.min ?? 0, props.max ?? 100];

    const [displayValue, setDisplayValue] = useState<number[]>(initialValue);
    const [activeThumb, setActiveThumb] = useState<number | undefined>(
      undefined,
    );
    const previousValueRef = useRef<number[] | undefined>(undefined);

    useEffect(() => {
      if (props.value) {
        setDisplayValue(props.value);
      }
    }, [props.value]);

    const handleValueChange = (newValue: number[]) => {
      setDisplayValue(newValue);
      if (activeThumb !== undefined && previousValueRef.current) {
        const previousValue = previousValueRef.current;
        const didCross =
          newValue[1 - activeThumb] !== previousValue[1 - activeThumb];

        if (didCross) {
          setActiveThumb(1 - activeThumb);
          previousValueRef.current = newValue;
        }
      }

      props.onValueChange?.(newValue);
    };

    const handlePointerDown = (index: number) => {
      previousValueRef.current = [...displayValue];
      setActiveThumb(index);
    };

    const handlePointerUp = () => {
      previousValueRef.current = undefined;
      setActiveThumb(undefined);
    };

    return (
      <TooltipProvider>
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex w-full touch-none items-center pb-8 select-none",
            className,
            props.disabled && "opacity-50",
          )}
          value={displayValue}
          {...props}
          onValueChange={handleValueChange}
          onPointerUp={handlePointerUp}
        >
          <div className="relative h-full w-full grow">
            <SliderPrimitive.Track className="bg-secondary relative block h-2 w-full grow items-center overflow-hidden rounded-full">
              <SliderPrimitive.Range className="absolute h-full bg-[image:var(--range-track-gradient)]" />
            </SliderPrimitive.Track>
            {showMinMaxLabel && (
              <div className="absolute top-0 mt-6 flex w-full justify-between text-sm font-medium">
                <span>{label ? label(props.min) : props.min}</span>
                <span>{label ? label(props.max) : props.max}</span>
              </div>
            )}
          </div>
          {displayValue.map((value, index) => (
            <React.Fragment key={index}>
              <Tooltip open={activeThumb === index}>
                <TooltipTrigger asChild>
                  <SliderPrimitive.Thumb
                    onPointerDown={() => handlePointerDown(index)}
                    className={cn(
                      "relative block h-6 w-6",
                      "border-primary border-1",
                      "bg-[image:var(--slider-thumb-gradient)]",
                      "rounded-full",
                      "ring-offset-background",
                      "cursor-grab transition-colors",
                      "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:cursor-grabbing",
                      "disabled:pointer-events-none disabled:opacity-50",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  sideOffset={5}
                  className="from-gradient-stop-1 to-gradient-stop-2 bg-gradient-to-r text-base font-bold text-white"
                >
                  {label ? label(value) : value}
                </TooltipContent>
              </Tooltip>
            </React.Fragment>
          ))}
        </SliderPrimitive.Root>
      </TooltipProvider>
    );
  },
);
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
