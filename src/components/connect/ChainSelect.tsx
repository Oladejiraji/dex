"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  CaretSortIcon,
  CheckIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCoinsRead } from "@/services/queries/coins";
import { CoinData, SocketToken } from "@/services/queries/coins/types";
import Image from "next/image";
import RemoteImage from "../shared/RemoteImage";

interface IProps {
  value: SocketToken | null;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChainSelect(props: IProps) {
  const { setIsPopOpen, value } = props;
  console.log(value?.logoURI);

  return (
    value && (
      <div>
        <Button
          variant="outline"
          role="combobox"
          className="border-none rounded-full bg-primary-400 font-geist-medium text-[15px] hover:bg-inherit hover:text-inherit"
          onClick={() => setIsPopOpen(true)}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8">
              <RemoteImage src={value.logoURI} width={32} height={32} />
            </div>
            <p>{value.symbol.toUpperCase()}</p>
          </div>
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </div>
    )
  );
}
