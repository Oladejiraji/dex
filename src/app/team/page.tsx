import Header from '@/components/shared/Header';
import Link from 'next/link';
import React from 'react';

const Team = () => {
  return (
    <>
      <Header type={1} />
      <div className="relative mx-auto mb-[1.25rem] mt-[9.38rem] max-w-[35.38rem] text-[#848A8C]">
        <div className="font-geist-medium text-base">
          <h1 className="pb-3 text-[#353535]">Oladeji Raji</h1>
          <p className="max-w-[15.6875rem] text-[#7B7B7B]">
            Notes on what we’re building at DEX Seven, A bridge for seamless token swaps.
          </p>
        </div>
        <div>
          <h3>Building a home for crypto enthusiasts that actually feels seamless</h3>
          <h4>January 2025</h4>
        </div>
        <div>
          <p>
            Building for crypto users can be tricky—no one quite optimizes like a crypto enthusiast, and most times,
            they're meticulous about every detail. That mindset applied to the team while building this as well: how do
            we create something secure, fast, and user-friendly for people navigating the ever-changing blockchain
            world? How do you make a decentralized exchange truly seamless?
          </p>
          <p>
            You simplify. That was what we came up with. While building the platform, the designer tested several
            interfaces before settling on this one. They had to decide what would serve the user best. Much like crypto
            itself, every user’s needs are different, so we crafted a platform flexible enough to adapt to them.
          </p>
          <p>
            So whoever you are, whether you're an experienced trader or just starting in DeFi, if you choose to swap
            tokens with us, we’ll ensure every swap is smooth, secure, and optimized to get you the best possible
            outcome.
          </p>
        </div>
        <div>
          <h1>One more thing - The team behind this..</h1>
          <h3>The Team</h3>
          <div>
            <p>Oladeji Raji</p>
            <Link href="/">rajioladeji2@gmail.com</Link>
          </div>
          <div>
            <p>Oladeji Raji</p>
            <Link href="/">rajioladeji2@gmail.com</Link>
          </div>
          <div>
            <p>Oladeji Raji</p>
            <Link href="/">rajioladeji2@gmail.com</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
