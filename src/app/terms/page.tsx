import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React from "react";

const Terms = () => {
  return (
    <div className="text-white max-w-[566px] mx-auto mt-14">
      <div className="pb-6">
        <h1 className="font-geist-bold text-2xl">Text and Privacy</h1>
        <p className="font-geist-light text-base">
          Latest Revision: 3rd of June 2024
        </p>
      </div>

      <div className="pb-6">
        <h1 className="font-geist-medium text-[18px]">Introduction</h1>
        <p className="font-geist-light text-[15px]">
          Welcome to Superbase. Before you delve into and engage with our
          comprehensive range of services, it&apos;s crucial to familiarize
          yourself with and accept our Terms of Service and Privacy Policy.
        </p>
      </div>
      <div className="pb-6">
        <h1 className="font-geist-medium text-[18px]">Acceptance of Terms</h1>
        <p className="font-geist-light text-[15px]">
          By accessing or utilizing the Superbase Offerings, you are confirming
          your understanding and unconditional acceptance of these Terms and the
          accompanying Privacy Policy. Furthermore, you ensure that you have the
          legal capacity and authority to enter into and be bound by these
          Terms.
        </p>
      </div>
      <div className="pb-6">
        <h1 className="font-geist-medium text-[18px]">
          Description of Our Services
        </h1>
        <p className="font-geist-light text-[15px]">
          Superbase, which is conveniently hosted at https://superbase.io,
          offers users a state-of-the-art decentralized bridge specifically
          designed for the smooth transfer of digital assets among a plethora of
          other related services.
        </p>
      </div>
      <div className="pb-6">
        <h1 className="font-geist-medium text-[18px]">
          Accessing & Using Our Platform
        </h1>
        <ul className="list-disc ml-4">
          <li className="font-geist-light text-[15px]">
            Wallet Connection: For an enhanced experience, users can seamlessly
            connect digital wallets, such as Metamask, to gain direct access to
            Superbase Smart Contracts.
          </li>
          <li className="font-geist-light text-[15px]">
            Governance: The Operator diligently oversees the Platform&apos;s
            functioning, but it&apos;s worth noting that Direct Usage operates
            independently and outside this purview.
          </li>
          <li className="font-geist-light text-[15px]">
            Transaction Fees: Some transactions may carry associated fees. Rest
            assured, users will always be informed and required to consent prior
            to any charges being applied.
          </li>
          <li className="font-geist-light text-[15px]">
            Transaction Fees: Some transactions may carry associated fees. Rest
            assured, users will always be informed and required to consent prior
            to any charges being applied.
          </li>
        </ul>
      </div>
      <div className="fixed left-0 bottom-[-200px]">
        <div className="w-full h-[600px]">
          <Image src={MainAssets.Mask} alt="Mask for page content" />
        </div>
      </div>
    </div>
  );
};

export default Terms;
