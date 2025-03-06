'use client';
import React, { useState } from 'react';
import cx from 'classnames';
import ExternalLink from '../ExternalLink';
import Button from '../Button';
import Clock from '@/lib/svg/Clock';
import Up from '@/lib/svg/Up';
import { TransHistoryModal } from '@/components/TransactionHistory/TransHistoryModal';

const ConnectFooter = ({ fixed = true }: { fixed?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TransHistoryModal isPopOpen={isOpen} setIsPopOpen={setIsOpen} />
      <footer className={cx('bottom-0 left-0 z-[1000] w-full pb-14 font-geist-medium', { fixed: !!fixed })}>
        <div className="mx-auto flex max-w-[75.00rem] items-end justify-center lg:justify-between">
          <div className="hidden flex-1 items-center gap-[0.25rem] lg:flex">
            <p className="font-geist-medium text-[0.94rem] text-[#919191]">Powered by</p>
            <ExternalLink href="https://www.socket.tech/">
              <p className="font-geist-semibold text-[1.00rem] text-[#ffffff]">Socket</p>
            </ExternalLink>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="relative flex items-end justify-center gap-4 overflow-hidden rounded-[0.38rem] border border-[#32323240] bg-transparent">
              <div className="gradient_border base_popover_gradient flex flex-col">
                <Button
                  variant="invincible"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="group z-[1000]"
                >
                  <div className="flex items-center gap-1">
                    <div className="flex h-[0.88rem] w-[0.88rem] items-center justify-center">
                      <Clock className="fill-[#919191] transition-colors group-hover:fill-white" />
                    </div>
                    <p className="text-base text-[#919191] transition-colors group-hover:text-white">
                      Transaction History
                    </p>
                    <div className="flex h-[0.88rem] w-[0.88rem] items-center justify-center">
                      <Up className="fill-[#919191] transition-colors group-hover:fill-white" />
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden flex-1 lg:block"></div>
        </div>
      </footer>
    </>
  );
};

export default ConnectFooter;
