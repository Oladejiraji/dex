import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import Input from '../Input';
import MainAssets from '@/lib/assets/main';
import { Options } from 'nuqs';

interface IProps {
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
  setSearchValue: (
    value: string | ((old: string | null) => string | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
  searchValue: string;
  isPopOpen: boolean;
}

const HomeHeaderInput = ({ setIsPopOpen, setSearchValue, searchValue, isPopOpen }: IProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleKeyDown = (event: KeyboardEvent) => {
    const isMac = navigator.userAgent.toUpperCase().includes('MAC');

    if ((isMac && event.metaKey && event.key === '/') || (!isMac && event.ctrlKey && event.key === '/')) {
      setIsPopOpen((prev) => !prev);
      const isActive = document.activeElement === ref.current;
      if (isActive) {
        ref.current?.blur();
      } else {
        ref.current?.focus();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Input
      onFocus={() => setIsPopOpen(true)}
      // onBlur={() => setIsPopOpen(false)}
      value={searchValue}
      ref={ref}
      onChange={(e) => setSearchValue(e.target.value)}
      iconBefore
      icon={MainAssets.Search}
      inButtonClassNames="right-[0.00rem]"
      inButton={
        isPopOpen ? null : (
          <div className="flex items-center gap-[0.25rem] font-geist-regular text-xs text-[#5F6368]">
            <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">⌘</p>
            <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">/</p>
          </div>
        )
      }
      placeholder="Search for a token, address or chain"
      className="border-none bg-transparent p-0 pl-4 font-geist-medium text-[0.81rem] text-[white] transition-colors placeholder:text-[#919191] hover:placeholder:text-[white]"
    />
  );
};

export default HomeHeaderInput;
