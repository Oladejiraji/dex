import * as React from "react";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface IProps {
  selData: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
}

export default function Select(props: IProps) {
  const {
    selData = [],
    placeholder,
    className = "",
    itemClassName = "",
    listClassName = "",
    value,
    onChange,
  } = props;
  return (
    <ShadcnSelect value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "border-none rounded-full bg-primary-400 font-geist-medium text-[15px] cursor-pointer",
          className
        )}
      >
        <SelectValue placeholder={placeholder} className="cursor-pointer" />
      </SelectTrigger>
      <SelectContent className={listClassName}>
        {selData.map((item, i) => {
          const hiddenCheck = item.value === value;
          return (
            <SelectItem
              key={i}
              value={item.value}
              className={cn({ hidden: hiddenCheck }, itemClassName)}
            >
              <div className="flex items-center gap-2">{item.label}</div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </ShadcnSelect>
  );
}
