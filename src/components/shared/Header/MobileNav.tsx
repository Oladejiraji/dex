import React from 'react';
import { motion } from 'framer-motion';
import { useQueryState } from 'nuqs';
import Input from '../Input';
import MainAssets from '@/lib/assets/main';
import RenderIf from '../RenderIf';
import { cn } from '@/lib/utils';
import { AppRoutes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';

const simplifyOptions = [
  {
    name: 'Chains',
    ready: true,
    options: ['BASE', 'POLYGON', 'ARBITRUM', 'SOLANA'],
  },
  {
    name: 'Tokens',
    ready: false,
  },
  {
    name: 'Addresses',
    ready: false,
  },
];
// const baseOptions = [
//   {
//     name: 'BASE',
//   },
//   {
//     name: 'ETHEREUM',
//   },
// ];
const otherOptions = [
  {
    name: 'DOCS',
  },
];
const linksOptions = [
  {
    name: 'Terms and Services',
    links: AppRoutes.terms.path,
  },
  {
    name: 'FAQs',
    links: AppRoutes.faq.path,
  },
];

interface IProps {
  closeNav: () => void;
}

const MobileNav = ({ closeNav }: IProps) => {
  const [search, setSearch] = useQueryState('search');
  return (
    <motion.div
      className="opacity-1 mobile_header_bg fixed right-0 top-0 h-screen w-screen lg:hidden"
      initial={{ right: '-100%' }}
      animate={{ right: 0 }}
      exit={{ right: '-100%' }}
    >
      <div className="relative px-6 py-[4.76rem]">
        <div className="mb-10">
          <Input
            iconBefore
            icon={MainAssets.Search}
            value={search || ''}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            iconBeforeClassNames="left-5"
            placeholder="Search our supported chains"
            className="h-8 min-w-[21.25rem] rounded-[0.375rem] border border-[#32323240] bg-transparent p-0 pl-11 font-geist-medium text-[0.81rem] text-[white] transition-colors placeholder:text-[#919191] hover:placeholder:text-[white]"
          />
        </div>
        <div>
          <h1 className="text-neutral pb-6 font-geist-medium text-[#919191]">Simplify By</h1>
          <div className="flex flex-col gap-4">
            {simplifyOptions.map((opt, i) => {
              return (
                <div key={i} className="flex items-center gap-2">
                  <h3
                    className={cn('font-geist-medium text-xl', {
                      'text-white': opt.ready,
                      'text-[#919191]': !opt.ready,
                    })}
                  >
                    {opt.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <RenderIf condition={opt.ready}>
                      {opt.options?.map((cld, j) => (
                        <p
                          className="text-very-small rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-white"
                          key={j}
                        >
                          {cld}
                        </p>
                      ))}
                    </RenderIf>
                    <RenderIf condition={!opt.ready}>
                      <p className="text-very-small rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-[#919191]">
                        COMING SOON
                      </p>
                    </RenderIf>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="mt-10">
          <h1 className="text-neutral pb-6 font-geist-medium text-[#919191]">L2 Onchain</h1>
          <div className="flex flex-col gap-4">
            {baseOptions.map((opt, i) => {
              return (
                <div key={i} className="flex items-center gap-2">
                  <h3 className="font-geist-medium text-xl text-[#919191]">{opt.name}</h3>
                  <div className="flex items-center gap-1">
                    <p className="text-very-small rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-[#919191]">
                      L2 PROTOCOL
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div> */}
        <div className="mt-10">
          <h1 className="text-neutral pb-6 font-geist-medium text-[#919191]">L2 Onchain</h1>
          <div className="flex flex-col gap-4">
            {otherOptions.map((opt, i) => {
              return (
                <div key={i} className="flex items-center gap-2">
                  <h3 className="font-geist-medium text-xl text-[#919191]">{opt.name}</h3>
                  <div className="flex items-center gap-1">
                    <p className="text-very-small rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-[#919191]">
                      COMING SOON
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-10">
          <h1 className="text-neutral pb-6 font-geist-medium text-[#919191]">Legal</h1>
          <div className="flex flex-col gap-4">
            {linksOptions.map((opt, i) => {
              return (
                <Link key={i} href={opt.links}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-geist-medium text-xl text-[#919191]">{opt.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-[-74px] right-[-30px]">
          <div className="">
            <Image src={MainAssets.MenuMask3} alt="Menu mask" />
          </div>
        </div>
        <button className="absolute right-[24px] top-[32px]" onClick={closeNav}>
          <div className="">
            <Image src={MainAssets.X} alt="Cancel image" />
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default MobileNav;
