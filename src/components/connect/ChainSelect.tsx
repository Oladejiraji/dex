"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { SocketToken } from "@/services/queries/coins/types";
import RemoteImage from "../shared/RemoteImage";

interface IProps {
  value: SocketToken | null;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChainSelect(props: IProps) {
  const { setIsPopOpen, value } = props;

  return (
    value && (
      <div>
        <Button
          variant="outline"
          role="combobox"
          className="border-none rounded-full bg-primary-400 font-geist-medium text-[0.94rem]  py-0 h-10"
          onClick={() => setIsPopOpen(true)}
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <RemoteImage
                src={value.logoURI}
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
            <p className="text-[0.94rem] font-geist-medium">
              {value.symbol.toUpperCase()}
            </p>
          </div>
          <ChevronDownIcon className="ml-4 h-[0.88rem] w-[0.88rem] shrink-0 opacity-50" />
        </Button>
      </div>
    )
  );
}
