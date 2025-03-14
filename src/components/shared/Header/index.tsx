'use client';
import React, { Suspense, useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import Link from 'next/link';
import { AppRoutes } from '@/utils/routes';
import { HeaderMenu } from '@/components/home/HeaderMenu';
import RenderIf from '../RenderIf';
import cx from 'classnames';
import { motion } from 'framer-motion';
import ConnectButton from '@/components/home/ConnectButton';
import Simplify from '@/lib/svg/Simplify';
import New from '@/lib/svg/New';
import { useSocketChainRead } from '@/services/queries/coins';
import HomeHeaderInput from './HomeHeaderInput';
import NetworkHeaderInput from './NetworkHeaderInput';
import MobileHeader from './MobileHeader';
import { useQueryState } from 'nuqs';
import useFilterChains from '@/hooks/useFilterChains';

const HeaderComp = ({ type }: { type?: number }) => {
  const { data } = useSocketChainRead();

  const [search, setSearch] = useQueryState('search');

  const processedData = useFilterChains(search, data);

  const [isPopOpen, setIsPopOpen] = useState(false);
  const [isMobileNavShow, setIsMobileNavShow] = useState(false);

  return (
    <>
      <header
        className={cx('fixed left-0 top-0 z-[1001] w-full px-8 py-7 font-geist-medium', {
          'bg-black/30 backdrop-blur-sm': !isPopOpen && !isMobileNavShow,
        })}
      >
        <MobileHeader isShow={isMobileNavShow} setIsShow={setIsMobileNavShow} />
        <div className="mx-auto hidden max-w-[75.00rem] items-start justify-between lg:flex">
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
                    <HomeHeaderInput
                      searchValue={search || ''}
                      setIsPopOpen={setIsPopOpen}
                      isPopOpen={isPopOpen}
                      setSearchValue={setSearch}
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
              <div className="relative flex items-center gap-8 rounded-[0.38rem] border border-[#32323240] bg-gradient-custom">
                <HeaderMenu isPopOpen={isPopOpen} processedData={processedData} />
              </div>
              <ConnectButton />
            </div>
          </RenderIf>
          {/* Menu 3 */}
          <RenderIf condition={type === 3}>
            <div className="flex w-2/3 items-center justify-between gap-4">
              <div className="relative flex items-center gap-8 rounded-[0.38rem] border border-[#32323240] bg-gradient-custom px-[0.63rem]">
                <div className="flex items-center gap-8">
                  <div>
                    <NetworkHeaderInput />
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

const Header = ({ type }: { type?: number }) => {
  return (
    <Suspense>
      <HeaderComp type={type} />
    </Suspense>
  );
};

export default Header;
