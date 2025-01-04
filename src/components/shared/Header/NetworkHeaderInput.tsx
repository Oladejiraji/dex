import React, { useEffect, useRef } from 'react';
import Input from '../Input';
import MainAssets from '@/lib/assets/main';
import { useGeneralContext } from '@/context/GeneralContext';

const NetworkHeaderInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { networkSearchValue, updateNetworkSearchValue } = useGeneralContext();
  const handleKeyDown = (event: KeyboardEvent) => {
    const isMac = navigator.userAgent.toUpperCase().includes('MAC');

    if ((isMac && event.metaKey && event.key === '/') || (!isMac && event.ctrlKey && event.key === '/')) {
      ref.current?.focus();
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
      iconBefore
      icon={MainAssets.Search}
      value={networkSearchValue}
      onChange={(e) => {
        updateNetworkSearchValue(e.target.value);
      }}
      ref={ref}
      inButton={
        <div className="flex items-center gap-[0.25rem] font-geist-regular text-xs text-[#5F6368]">
          <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">⌘</p>
          <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">/</p>
        </div>
      }
      inButtonClassNames="right-[0.00rem]"
      placeholder="Search our supported chains"
      className="min-w-[21.25rem] border-none bg-transparent p-0 pl-4 font-geist-medium text-[0.81rem] text-[white] transition-colors placeholder:text-[#919191] hover:placeholder:text-[white]"
    />
  );
};

export default NetworkHeaderInput;
