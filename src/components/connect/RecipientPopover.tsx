import { Label } from "@/components/ui/label";
import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import cx from "classnames";
import Input from "../shared/Input";
import { ethers } from "ethers";
import { ChainOptions } from "@/data/ChainOptions";
import RenderIf from "../shared/RenderIf";
import { useCoinsRead, useSocketTokensRead } from "@/services/queries/coins";
import { CoinData, SocketToken } from "@/services/queries/coins/types";
import { useExchangeContext } from "@/context/ExchangeContext";
import { chainBaseData } from "@/utils/static";
import RemoteImage from "../shared/RemoteImage";
import { Checkbox } from "../ui/checkbox";
import { useAccount } from "wagmi";
import { cleanText } from "@/utils/helpers";
import Button from "../shared/Button";

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

export function RecipientPopover({ isPopOpen, setIsPopOpen }: IProps) {
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState("");
  const { address } = useAccount();
  const [termsValue, setTermsValue] = useState(false);
  const { updateRecipientAddress, recipientAddress } = useExchangeContext();

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue(cleanText(text));
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  useEffect(() => {
    if (value === "") {
      setValueError("");
    } else if (address === value) {
      setValueError(
        "Please enter an address different than the connected wallet address"
      );
    } else if (!ethers.isAddress(value)) {
      setValueError("Invalid Address");
    } else setValueError("");
  }, [value]);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 bottom-0 z-[50] backdrop-blur-[4px] bg-transparent w-full h-full pt-[66px] pb-[43px] flex items-end"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[470px] mx-auto w-full relative p-[1px] h-fit ">
            <div className="gradient_bg absolute inset-0 w-full h-full rounded-[6px]" />
            {recipientAddress ? (
              <div className="relative select_gradient py-6 rounded-[6px] flex-1 flex flex-col px-6">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-base font-geist-medium">
                    Edit Recipient Address
                  </h1>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-[#83838340]"
                    onClick={() => setIsPopOpen(false)}
                  >
                    <div className="w-[11px] h-[11px]">
                      <Image src={MainAssets.X} alt="X icon" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center gap-2 ">
                  <Input
                    className={cx(
                      "bg-transparent border border-[#32323240] font-geist-medium text-[12px] text-[#919191] p-3 h-12  rounded-[6px]",
                      { "border-[#D19191]": !!valueError }
                    )}
                    containerClass="flex-1"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    disabled
                    placeholder="Destination Wallet"
                  />
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full h-14 bg-[#1E1E1E]"
                    disabled={!termsValue || !!valueError}
                    onClick={() => {
                      updateRecipientAddress("");
                      setValue("");
                      setTermsValue(false);
                    }}
                  >
                    <p className="text-grey-400 font-geist-medium">
                      Remove Address
                    </p>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative select_gradient py-6 rounded-[6px] flex-1 flex flex-col px-6">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="text-base font-geist-medium">
                    Enter Recipient Address
                  </h1>
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center border border-[#83838340]"
                    onClick={() => setIsPopOpen(false)}
                  >
                    <div className="w-[11px] h-[11px]">
                      <Image src={MainAssets.X} alt="X icon" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center gap-2 ">
                  <Input
                    className={cx(
                      "bg-transparent border border-[#32323240] font-geist-medium text-[12px] text-[#919191] p-3 h-12  rounded-[6px]",
                      { "border-[#D19191]": !!valueError }
                    )}
                    containerClass="flex-1"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Destination Wallet"
                    inButton={
                      <button
                        className="text-[#B9B9B9] text-[10px] font-geist-medium bg-[#1D1D1D] p-1 rounded-[3px]"
                        onClick={handlePaste}
                      >
                        PASTE
                      </button>
                    }
                  />
                </div>
                <RenderIf condition={!!valueError}>
                  <div className="flex items-center gap-2 bg-primary-200 my-2 p-2 rounded-[6px]">
                    <div className="w-5 h-5">
                      <Image src={MainAssets.Danger} alt="danger image" />
                    </div>
                    <p className="font-geist-medium text-xs text-[#D19191]">
                      {valueError}
                    </p>
                  </div>
                </RenderIf>
                <div className="flex items-center space-x-2 mt-3">
                  <Checkbox
                    id="terms"
                    checked={termsValue}
                    onCheckedChange={(val: boolean) => {
                      setTermsValue(val);
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-[13px] leading-[15px] font-geist-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    This address is correct and not an exchange wallet. Any
                    tokens sent to the wrong address will be impossible to
                    retrieve.
                  </label>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full h-14 bg-[#1E1E1E]"
                    disabled={!termsValue || !!valueError}
                    onClick={() => {
                      updateRecipientAddress(value);
                      setIsPopOpen(false);
                    }}
                  >
                    <p className="text-grey-400 font-geist-medium">
                      Save Address
                    </p>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
