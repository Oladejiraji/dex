import React, { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import Link from 'next/link';
import { AppRoutes } from '@/utils/routes';
import Input from '../Input';
import { HeaderMenu } from '@/components/home/HeaderMenu';
import RenderIf from '../RenderIf';
import cx from 'classnames';
import { motion } from 'framer-motion';
import ConnectButton from '@/components/home/ConnectButton';
import Simplify from '@/lib/svg/Simplify';
import New from '@/lib/svg/New';
import { useSocketChainRead } from '@/services/queries/coins';
import { useDebounce } from '@/hooks/useDebounce';
import { useGeneralContext } from '@/context/GeneralContext';

const Header = ({ type }: { type?: number }) => {
  const { data } = useSocketChainRead();
  const { networkSearchValue, updateNetworkSearchValue } = useGeneralContext();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const processedData = useMemo(() => {
    if (!data) return [];

    const trimSearch = debouncedSearchValue.trim().toLowerCase();

    return [...data].filter((item) => {
      if (!trimSearch) return true;
      return item.name.trim().toLowerCase().includes(trimSearch);
    });
  }, [data, debouncedSearchValue]);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    const isMac = navigator.userAgent.toUpperCase().includes('MAC');

    if ((isMac && event.metaKey && event.key === '/') || (!isMac && event.ctrlKey && event.key === '/')) {
      setIsPopOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className={cx('fixed left-0 top-0 z-[1001] w-full px-8 py-7 font-geist-medium', {
          'bg-black/30 backdrop-blur-sm': !isPopOpen,
        })}
      >
        <div className="mx-auto flex max-w-[75.00rem] items-start justify-between">
          <Link href={AppRoutes.home.path}>
            <Button>
              <div className="flex items-center gap-1">
                <div className="mt-1 h-4 w-3">
                  <Image src={MainAssets.Right} alt="Left Icon for title button" />
                </div>
                <p className="text-base text-grey-100">Superbase</p>
              </div>
            </Button>
          </Link>

          {/* Menu 1 */}
          <RenderIf condition={type === 1}>
            <div className="relative flex items-center gap-3 rounded-[0.38rem] border border-[#32323240] bg-gradient-custom">
              <motion.div
                className="menu_dropdown_bg relative z-[1002] flex flex-col items-center rounded-[0.38rem]"
                animate={{
                  height: isPopOpen ? '325px' : '40px',
                  width: '603px',
                }}
                transition={{ duration: 0.2 }}
              >
                <div className={cx('flex w-full items-center justify-between gap-0 px-2')}>
                  <div>
                    <Button
                      variant="invincible"
                      // onClick={() => setIsPopOpen(true)}
                      className="group"
                    >
                      <div className="flex items-center gap-1">
                        <div className="flex h-4 w-3 items-center justify-center">
                          <Simplify className="fill-[#919191] transition-colors group-hover:fill-white" />
                        </div>

                        <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">
                          Simplify
                        </p>
                      </div>
                    </Button>
                  </div>

                  <div className="w-[19.75rem]">
                    <Input
                      onFocus={() => setIsPopOpen(true)}
                      // onBlur={() => setIsPopOpen(false)}
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      iconBefore
                      icon={MainAssets.Search}
                      inButtonClassNames="right-[0.00rem]"
                      inButton={
                        isPopOpen ? null : (
                          <div className="flex items-center gap-[0.25rem] font-geist-regular text-xs text-[#5F6368]">
                            <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">
                              ⌘
                            </p>
                            <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">
                              /
                            </p>
                          </div>
                        )
                      }
                      placeholder="Search for a token, address or chain"
                      className="border-none bg-transparent p-0 pl-4 font-geist-medium text-[0.81rem] text-[white] transition-colors placeholder:text-[#919191] hover:placeholder:text-[white]"
                    />
                  </div>
                  <div>
                    <Link href={AppRoutes.networks.path}>
                      <Button variant="invincible" className="group">
                        <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">
                          Supported Networks
                        </p>
                      </Button>
                    </Link>
                  </div>
                </div>
                <HeaderMenu isPopOpen={isPopOpen} processedData={processedData} />
              </motion.div>
              {isPopOpen ? (
                <div
                  onClick={() => {
                    setIsPopOpen(false);
                  }}
                  className={cx(
                    'fixed left-0 top-0 h-screen w-screen bg-black/30 backdrop-blur-[0.81rem]',
                    { 'opacity-1': !!isPopOpen },
                    { 'opacity-0': !isPopOpen }
                  )}
                ></div>
              ) : null}
            </div>
            <div className="flex gap-3">
              <Link href={AppRoutes.connect.path(137)}>
                <Button variant="ghost" className="group">
                  <div className="flex items-center gap-1">
                    <div className="rounded-[0.25rem] bg-primary-200 px-[0.38rem] py-[0.25rem]">
                      <div className="flex h-4 w-3 items-center justify-center">
                        <New className="fill-[#919191] transition-colors group-hover:fill-white" />
                      </div>
                    </div>
                    <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">Trade</p>
                  </div>
                </Button>
              </Link>
              <ConnectButton />
            </div>
          </RenderIf>
          {/* Menu 2 */}
          <RenderIf condition={type === 2}>
            <div className="flex items-center gap-4">
              <div className="relative flex hidden items-center gap-8 rounded-[0.38rem] border border-[#32323240] bg-gradient-custom">
                <HeaderMenu isPopOpen={isPopOpen} processedData={processedData} />
                <Button
                  variant="invincible"
                  // onClick={() => setIsPopOpen(true)}
                  className="group"
                >
                  <div className="flex items-center gap-1">
                    <div className="flex h-4 w-3 items-center justify-center">
                      <Simplify className="fill-[#919191] transition-colors group-hover:fill-white" />
                    </div>

                    <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">Simplify</p>
                  </div>
                </Button>
                <Button variant="invincible">
                  <div className="flex items-center gap-1">
                    <div className="flex h-4 w-3 items-center justify-center">
                      <Image src={MainAssets.Search} alt="Left icon for the new button" />
                    </div>
                    <p className="text-[0.81rem] text-grey-100">Search Chain</p>
                  </div>
                </Button>
              </div>
              <Link href={AppRoutes.connect.path(137)}>
                <Button variant="ghost" className="group">
                  <div className="flex items-center gap-1">
                    <div className="rounded-[0.25rem] bg-primary-200 px-[0.38rem] py-[0.25rem]">
                      <div className="flex h-4 w-3 items-center justify-center">
                        <New className="fill-[#919191] transition-colors group-hover:fill-white" />
                      </div>
                    </div>
                    <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">Trade</p>
                  </div>
                </Button>
              </Link>
              <ConnectButton />
            </div>
          </RenderIf>
          {/* Menu 3 */}
          <RenderIf condition={type === 3}>
            <div className="flex w-2/3 items-center justify-between gap-4">
              <div className="relative flex items-center gap-8 rounded-[0.38rem] border border-[#32323240] bg-gradient-custom px-[0.63rem]">
                <div className="flex items-center gap-8">
                  <div>
                    <Input
                      iconBefore
                      icon={MainAssets.Search}
                      value={networkSearchValue}
                      onChange={(e) => {
                        updateNetworkSearchValue(e.target.value);
                      }}
                      inButton={
                        <div className="flex items-center gap-[0.25rem] font-geist-regular text-xs text-[#5F6368]">
                          <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">
                            ⌘
                          </p>
                          <p className="flex h-5 w-[1.38rem] items-center justify-center rounded-[0.19rem] bg-[#2A2A2A]">
                            /
                          </p>
                        </div>
                      }
                      inButtonClassNames="right-[0.00rem]"
                      placeholder="Search our supported chains"
                      className="min-w-[21.25rem] border-none bg-transparent p-0 pl-4 font-geist-medium text-[0.81rem] text-[white] transition-colors placeholder:text-[#919191] hover:placeholder:text-[white]"
                    />
                  </div>
                </div>
              </div>
              <ConnectButton />
            </div>
          </RenderIf>
        </div>
      </header>
    </>
  );
};

export default Header;
