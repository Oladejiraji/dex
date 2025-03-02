import Header from '@/components/shared/Header';
import Link from 'next/link';
import React from 'react';

const Team = () => {
  return (
    <>
      <Header type={1} />
      <div className="relative mx-auto mb-[1.25rem] mt-[6.5rem] max-w-[35.38rem] px-6 text-[#848A8C] lg:mt-[9.38rem] lg:px-0">
        <div className="font-geist-medium text-base">
          <h1 className="pb-3 text-base text-[#353535]">Oladeji Raji</h1>
          <p className="text-base text-[#7B7B7B]">Notes on what we’re building at Superbase,</p>
          <p className="text-base text-[#7B7B7B]">A bridge for seamless token swaps.</p>
        </div>
        <div className="mb-6 mt-9 lg:mt-14">
          <h3 className="pb-2 font-geist-medium text-lg leading-[1.5rem] text-[#B7B7B7] lg:text-xl">
            Building a home for crypto enthusiasts that actually feels seamless
          </h3>
          <h4 className="font-geist-medium text-base text-[#353535]">January 2025</h4>
        </div>
        <div className="pb-11">
          <p className="pb-6 font-geist-medium text-base text-[#7B7B7B]">
            Building for crypto users can be tricky—no one quite optimizes like a crypto enthusiast, and most times,
            they're meticulous about every detail. That mindset applied to the team while building this as well: how do
            we create something secure, fast, and user-friendly for people navigating the ever-changing blockchain
            world? How do you make a decentralized exchange truly seamless?
          </p>
          <p className="pb-6 font-geist-medium text-base text-[#7B7B7B]">
            You simplify. That was what we came up with. While building the platform, the designer tested several
            interfaces before settling on this one. They had to decide what would serve the user best. Much like crypto
            itself, every user’s needs are different, so we crafted a platform flexible enough to adapt to them.
          </p>
          <p className="font-geist-medium text-base text-[#7B7B7B]">
            So whoever you are, whether you're an experienced trader or just starting in DeFi, if you choose to swap
            tokens with us, we’ll ensure every swap is smooth, secure, and optimized to get you the best possible
            outcome.
          </p>
        </div>
        <div>
          <h1 className="pb-6 font-geist-medium text-base text-[#7B7B7B]">One more thing - The team behind this..</h1>
          <h3 className="pb-4 font-geist-medium text-base text-[#353535]">The Team</h3>
          <div className="mb-10 flex flex-col gap-5">
            <div className="flex items-center justify-between font-geist-medium text-base">
              <p className="text-[#7B7B7B]">Oladeji Raji</p>
              <Link href="/" className="text-[#353535]">
                rajioladeji2@gmail.com
              </Link>
            </div>
            <div className="flex items-center justify-between font-geist-medium text-base">
              <p className="text-[#7B7B7B]">Oladeji Raji</p>
              <Link href="/" className="text-[#353535]">
                rajioladeji2@gmail.com
              </Link>
            </div>
            <div className="flex items-center justify-between font-geist-medium text-base">
              <p className="text-[#7B7B7B]">Oladeji Raji</p>
              <Link href="/" className="text-[#353535]">
                rajioladeji2@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
