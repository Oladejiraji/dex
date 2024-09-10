"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import RenderIf from "../RenderIf";

interface IProps {
  selData: {
    value: string;
    label: string;
    icon?: any;
  }[];
}

export function Combobox(props: IProps) {
  const { selData } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selData[0].value);

  const currValue = selData.find((item) => item.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="border-none rounded-full bg-primary-400 font-geist-medium text-[15px] hover:bg-inherit hover:text-inherit"
        >
          <div className="flex items-center gap-2">
            {currValue && currValue.icon && <currValue.icon />}
            <p>{currValue?.label}</p>
          </div>
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {selData.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
