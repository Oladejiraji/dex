import MainAssets from '@/lib/assets/main';
import { AppRoutes } from '@/utils/routes';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Button from '../Button';
import ConnectButton from '@/components/home/ConnectButton';
import MobileNav from './MobileNav';

const MobileHeader = () => {
  const [isShow, setIsShow] = useState(false);
  const closeNav = () => setIsShow(false);

  return (
    <>
      <div className="mx-auto flex max-w-[75.00rem] items-start justify-between lg:hidden">
        <Link href={AppRoutes.home.path}>
          <Button>
            <div className="flex items-center gap-1">
              <div className="mt-1 h-4 w-3">
                <Image src={MainAssets.Right} alt="Left Icon for title button" />
              </div>
            </div>
          </Button>
        </Link>
        <div className="flex items-center">
          <ConnectButton />
          <Button className="h-8 border-0" onClick={() => setIsShow(true)}>
            <div className="flex items-center gap-1">
              <div className="mt-1 h-4 w-3">
                <Image src={MainAssets.Burger} alt="Burger menu button" />
              </div>
            </div>
          </Button>
        </div>
      </div>
      <AnimatePresence>{isShow ? <MobileNav closeNav={closeNav} /> : null}</AnimatePresence>
    </>
  );
};

export default MobileHeader;
