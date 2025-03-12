import MainAssets from '@/lib/assets/main';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import cx from 'classnames';
import Input from '../shared/Input';
import { ethers } from 'ethers';
import RenderIf from '../shared/RenderIf';
import { Checkbox } from '../ui/checkbox';
import { useAccount } from 'wagmi';
import { cleanText } from '@/utils/helpers';
import Button from '../shared/Button';
import { MODAL_ANIMATION_VARIANTS } from '@/animation/variants';

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  recipientAddressValue: string;
  setRecipientAddressValue: Dispatch<SetStateAction<string>>;
}

export function RecipientPopover({ isPopOpen, setIsPopOpen, recipientAddressValue, setRecipientAddressValue }: IProps) {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const { address } = useAccount();
  const [termsValue, setTermsValue] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setValue(cleanText(text));
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  useEffect(() => {
    if (value === '') {
      setValueError('');
    } else if (address === value) {
      setValueError('Please enter an address different than the connected wallet address');
    } else if (!ethers.isAddress(value)) {
      setValueError('Invalid Address');
    } else setValueError('');
  }, [value]);

  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute bottom-0 left-0 z-[50] flex h-full w-full items-end bg-transparent pb-[2.69rem] pt-[4.13rem] backdrop-blur-[0.25rem]"
          variants={MODAL_ANIMATION_VARIANTS}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <div className="relative mx-auto h-fit w-full max-w-[29.38rem] p-[0.06rem]">
            <div className="gradient_bg absolute inset-0 h-full w-full rounded-[0.38rem]" />
            {recipientAddressValue ? (
              <div className="select_gradient relative flex flex-1 flex-col rounded-[0.38rem] px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="font-geist-medium text-base">Edit Recipient Address</h1>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#83838340]"
                    onClick={() => setIsPopOpen(false)}
                  >
                    <div className="h-[0.69rem] w-[0.69rem]">
                      <Image src={MainAssets.X} alt="X icon" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    className={cx(
                      'h-12 rounded-[0.38rem] border border-[#32323240] bg-transparent p-3 font-geist-medium text-[0.75rem] text-[#919191]',
                      { 'border-[#D19191]': !!valueError }
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
                    className="h-14 w-full bg-[#1E1E1E]"
                    disabled={!termsValue || !!valueError}
                    onClick={() => {
                      setRecipientAddressValue('');
                      setValue('');
                      setTermsValue(false);
                    }}
                  >
                    <p className="font-geist-medium text-grey-400">Remove Address</p>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="select_gradient relative flex flex-1 flex-col rounded-[0.38rem] px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <h1 className="font-geist-medium text-base">Enter Recipient Address</h1>
                  <button
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#83838340]"
                    onClick={() => setIsPopOpen(false)}
                  >
                    <div className="h-[0.56rem] w-[0.56rem]">
                      <Image src={MainAssets.X} alt="X icon" />
                    </div>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    className={cx(
                      'h-12 rounded-[0.38rem] border border-[#32323240] bg-transparent p-3 font-geist-medium text-[0.75rem] text-[#919191]',
                      { 'border-[#D19191]': !!valueError }
                    )}
                    containerClass="flex-1"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder="Destination Wallet"
                    inButton={
                      <button
                        className="rounded-[0.19rem] bg-[#1D1D1D] p-1 font-geist-medium text-[0.63rem] text-[#B9B9B9]"
                        onClick={handlePaste}
                      >
                        PASTE
                      </button>
                    }
                  />
                </div>
                <RenderIf condition={!!valueError}>
                  <div className="my-2 flex items-center gap-2 rounded-[0.38rem] bg-primary-200 p-2">
                    <div className="h-5 w-5">
                      <Image src={MainAssets.Danger} alt="danger image" />
                    </div>
                    <p className="font-geist-medium text-xs text-[#D19191]">{valueError}</p>
                  </div>
                </RenderIf>
                <div className="mt-3 flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="border-[gray]"
                    checked={termsValue}
                    onCheckedChange={(val: boolean) => {
                      setTermsValue(val);
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="font-geist-medium text-[0.81rem] leading-[0.94rem] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    This address is correct and not an exchange wallet. Any tokens sent to the wrong address will be
                    impossible to retrieve.
                  </label>
                </div>
                <div className="mt-4">
                  <Button
                    variant="invincible"
                    className="h-14 w-full bg-[#1E1E1E]"
                    disabled={!termsValue || !!valueError}
                    onClick={() => {
                      setRecipientAddressValue(value);
                      setIsPopOpen(false);
                    }}
                  >
                    <p className="font-geist-medium text-grey-400">Save Wallet Address</p>
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
