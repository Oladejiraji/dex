import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useQueryState } from 'nuqs';
import Input from '../Input';
import MainAssets from '@/lib/assets/main';
import RenderIf from '../RenderIf';
import { cn } from '@/lib/utils';
import { AppRoutes } from '@/utils/routes';
import Link from 'next/link';
import Image from 'next/image';
import useFilterChains from '@/hooks/useFilterChains';
import { useSocketChainRead } from '@/services/queries/coins';
import RemoteImage from '../RemoteImage';

const simplifyOptions = [
  {
    name: 'Chains',
    ready: true,
    link: AppRoutes.networks.path,
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
  {
    name: 'Team',
    links: AppRoutes.team.path,
  },
];

interface IProps {
  closeNav: () => void;
}

const MobileNav = ({ closeNav }: IProps) => {
  const [search, setSearch] = useQueryState('search');
  const { data } = useSocketChainRead();
  const processedData = useFilterChains(search, data);

  const showProcessed = processedData.length > 0 && !!search;

  return (
    <motion.div
      className="opacity-1 mobile_header_bg fixed right-0 top-0 h-screen w-screen lg:hidden"
      initial={{ right: '-100%' }}
      animate={{ right: 0 }}
      exit={{ right: '-100%' }}
    >
      <div className="relative px-6 py-[4.76rem]">
        <div className="relative mb-10">
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
          <AnimatePresence>
            <RenderIf condition={showProcessed}>
              <motion.div
                className="absolute left-0 top-10 ml-5 mt-9 flex flex-col gap-6"
                animate={{ opacity: showProcessed ? 1 : 0 }}
              >
                {processedData.slice(0, 8).map((chain, i) => (
                  <Link key={i} href={AppRoutes.connect.path(chain.chainId)}>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6">
                        <RemoteImage src={chain.icon} width={24} height={24} className="rounded-full" />
                      </div>
                      <div>
                        <p className="font-geist-medium text-[0.81rem] leading-[1.00rem] text-[#F9F9F9]">
                          {chain.name}
                        </p>
                        <p className="font-geist-medium text-[0.63rem] leading-[0.75rem] text-[#5F5F5F]">
                          {chain.isL1 ? 'L1 Protocol' : 'L2 Protocol'}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </RenderIf>
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <RenderIf condition={!showProcessed}>
            <motion.div animate={{ opacity: showProcessed ? 0 : 1 }}>
              <div>
                <h1 className="pb-6 font-geist-medium text-neutral text-[#919191]">Simplify By</h1>
                <div className="flex flex-col gap-4">
                  {simplifyOptions.map((opt, i) => {
                    return (
                      <Link href={opt.link || '#'} key={i}>
                        <div className="flex items-center gap-2">
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
                                  className="rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-very-small text-white"
                                  key={j}
                                >
                                  {cld}
                                </p>
                              ))}
                            </RenderIf>
                            <RenderIf condition={!opt.ready}>
                              <p className="rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-very-small text-[#919191]">
                                COMING SOON
                              </p>
                            </RenderIf>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10">
                <h1 className="pb-6 font-geist-medium text-neutral text-[#919191]">L2 Onchain</h1>
                <div className="flex flex-col gap-4">
                  {otherOptions.map((opt, i) => {
                    return (
                      <div key={i} className="flex items-center gap-2">
                        <h3 className="font-geist-medium text-xl text-[#919191]">{opt.name}</h3>
                        <div className="flex items-center gap-1">
                          <p className="rounded-[3px] bg-[#151617] px-1 py-[0.25rem] font-geist-semibold text-very-small text-[#919191]">
                            COMING SOON
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-10">
                <h1 className="pb-6 font-geist-medium text-neutral text-[#919191]">Legal</h1>
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
            </motion.div>
          </RenderIf>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-[-24px] right-[-30px]">
        <div className="">
          <Image src={MainAssets.MenuMask3} alt="Menu mask" />
        </div>
      </div>
      <button className="absolute right-[24px] top-[32px]" onClick={closeNav}>
        <div className="">
          <Image src={MainAssets.X} alt="Cancel image" />
        </div>
      </button>
    </motion.div>
  );
};

export default MobileNav;
