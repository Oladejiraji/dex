"use client";

import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChainDialog } from "./ChainDialog";

interface IProps {
  selData: {
    value: string;
    label: string;
    icon?: any;
  }[];
}

export function ChainSelect(props: IProps) {
  const { selData } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selData[0].value);

  const currValue = selData.find((item) => item.value === value);

  return (
    <div>
      {/* <ChainDialog /> */}
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
    </div>
  );
}
