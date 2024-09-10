import * as React from "react";

import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IProps {
  selData: {
    label: string;
    icon?: any;
    value: string;
  }[];
  placeholder?: string;
}

export default function Select(props: IProps) {
  const { selData, placeholder } = props;
  return (
    <ShadcnSelect defaultValue={selData[0].value}>
      <SelectTrigger className="border-none rounded-full bg-primary-400 font-geist-medium text-[15px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selData.map((item, i) => (
            <SelectItem key={i} value={item.value}>
              <div className="flex items-center gap-2">
                <item.icon />
                {item.label}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  );
}
