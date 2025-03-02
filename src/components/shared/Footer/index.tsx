'use client';
import React, { useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import Link from 'next/link';
import { AppRoutes } from '@/utils/routes';
import RenderIf from '../RenderIf';
import { motion } from 'framer-motion';
import { BasePopover } from '@/components/home/BasePopover';
import cx from 'classnames';
import OnChain from '@/lib/svg/OnChain';
import Question from '@/lib/svg/Question';

const Footer = ({ expand, fixed = true }: { expand?: boolean; fixed?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <footer
        className={cx(
          'bottom-0 left-0 z-[1000] hidden w-full pb-14 font-geist-medium lg:block',
          { fixed: !!fixed },
          { relative: !fixed }
        )}
      >
        <div className="mx-auto flex max-w-[75.00rem] items-end justify-between">
          <div className="flex flex-1">
            <div className="flex items-center justify-between gap-4 rounded-[0.38rem] border border-[#32323240] bg-transparent">
              <Link href={AppRoutes.terms.path}>
                <Button variant="invincible" className="group">
                  <div className="flex items-center gap-1">
                    <div className="flex h-[0.88rem] w-[0.88rem] items-center justify-center">
                      <Question className="fill-[#919191] transition-colors group-hover:fill-white" />
                    </div>

                    <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">
                      Terms and Privacy
                    </p>
                  </div>
                </Button>
              </Link>
              <Link href={AppRoutes.faq.path}>
                <Button variant="invincible" className="group">
                  <div className="flex items-center gap-1">
                    <div className="flex h-[0.88rem] w-[0.88rem] items-center justify-center">
                      <Question className="fill-[#919191] transition-colors group-hover:fill-white" />
                    </div>
                    <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">FAQs</p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          <RenderIf condition={!!expand}>
            <div className="flex flex-1 justify-center">
              <motion.div
                className="relative flex items-end justify-center gap-4 overflow-hidden rounded-[0.38rem] border border-[#32323240] bg-transparent"
                animate={{
                  width: isMenuOpen ? '351px' : '140px',
                  height: isMenuOpen ? '329px' : '40px',
                }}
              >
                <div className="gradient_border base_popover_gradient flex flex-col">
                  <BasePopover isPopOpen={isMenuOpen} />
                  <Button
                    variant="invincible"
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    className="group z-[1000]"
                  >
                    <div className="flex items-center gap-1">
                      <div className="flex h-[0.88rem] w-[0.88rem] items-center justify-center">
                        <OnChain className="fill-[#919191] transition-colors group-hover:fill-white" />
                      </div>
                      <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">
                        Base Onchain
                      </p>
                      <div className="flex h-[0.88rem] w-[0.88rem] items-center justify-center">
                        <Image
                          src={isMenuOpen ? MainAssets.Minus : MainAssets.Plus}
                          alt="Left icon for the faq button"
                        />
                      </div>
                    </div>
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="flex-1"></div>
          </RenderIf>
        </div>
      </footer>
    </>
  );
};

export default Footer;
