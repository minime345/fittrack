"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Select = ({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  const currentItem = React.Children.toArray(children).find(
    (child: any) => React.isValidElement(child) && child.props.value === value
  ) as React.ReactElement | undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm shadow-sm">
          {currentItem?.props.children ?? "Избор"}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Търси..." />
          <CommandEmpty>Няма резултати</CommandEmpty>
          <CommandGroup>
            <CommandList>{React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) return null;
              return React.cloneElement(child, { onSelect: () => {
                onValueChange(child.props.value);
                setOpen(false);
              } });
            })}</CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn("flex items-center justify-between rounded-md border px-3 py-2 text-sm", className)}
    {...props}
  />
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ children }: { children?: React.ReactNode }) => (
  <span>{children}</span>
);

const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const SelectItem = ({
  value,
  children,
  onSelect,
}: {
  value: string;
  children: React.ReactNode;
  onSelect?: () => void;
}) => (
  <CommandItem
    value={value}
    onSelect={onSelect}
    className="flex items-center justify-between"
  >
    {children}
    <Check
      className={cn("ml-2 h-4 w-4", {
        "opacity-100": true,
        "opacity-0": false,
      })}
    />
  </CommandItem>
);

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
