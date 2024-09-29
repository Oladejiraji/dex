"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React, { Fragment, useEffect, useRef, useState } from "react";

const AnimatedLines = ({
  line,
  index,
  lines,
}: {
  line: string;
  lines: string[];
  index: number;
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [classes, setClasses] = useState("white");
  useEffect(() => {
    // Function to update the distance of the element from the top
    const updateDistance = () => {
      const scrollAtTop = window.scrollY === 0;
      const scrolledToEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        if (scrolledToEnd) {
          setClasses("#848A8C");
          return;
        }
        if (scrollAtTop) {
          setClasses("white");
          return;
        }
        if (rect.top < 240) {
          setClasses("#848A8C");
        } else {
          setClasses("white");
        }
      }
    };

    window.addEventListener("scroll", updateDistance);

    return () => {
      window.removeEventListener("scroll", updateDistance);
    };
  }, []);
  return (
    <span
      ref={elementRef}
      style={{ color: classes }}
      className="transition-all duration-500"
    >
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  );
};

const AnimatedCharacters = ({ children }: { children: string }) => {
  const lines = children.split("\n");

  return (
    <span className="whitespace-pre-wrap">
      {lines.map((line, index) => (
        <AnimatedLines key={index} line={line} index={index} lines={lines} />
      ))}
    </span>
  );
};

const Terms = () => {
  return (
    <>
      <Header type={1} />
      <div className="text-white max-w-[566px] mx-auto mt-[150px] mb-[20px] relative ">
        <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] z-[-1]" />
        <div className="pb-6">
          <h1 className="text-[#8C8487] text-base font-geist-medium pb-3 ">
            <AnimatedCharacters>Superbase</AnimatedCharacters>
          </h1>
          <h1 className="font-geist-bold text-2xl">
            <AnimatedCharacters>Text and Privacy</AnimatedCharacters>
          </h1>
          <p className="font-geist-light text-base mix-blend-color">
            <AnimatedCharacters>
              Latest Revision: 3rd of June 2024
            </AnimatedCharacters>
          </p>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            <AnimatedCharacters>Introduction</AnimatedCharacters>
          </h1>
          <p className="font-geist-light text-[15px]">
            <AnimatedCharacters>
              Welcome to Superbase. Before you delve into and engage with our
              comprehensive range of services, it&apos;s crucial to familiarize
              yourself with and accept our Terms of Service and Privacy Policy.
            </AnimatedCharacters>
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            <AnimatedCharacters>Acceptance of Terms</AnimatedCharacters>
          </h1>
          <p className="font-geist-light text-[15px]">
            <AnimatedCharacters>
              By accessing or utilizing the Superbase Offerings, you are
              confirming your understanding and unconditional acceptance of
              these Terms and the accompanying Privacy Policy. Furthermore, you
              ensure that you have the legal capacity and authority to enter
              into and be bound by these Terms.
            </AnimatedCharacters>
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            <AnimatedCharacters>Description of Our Services</AnimatedCharacters>
          </h1>
          <p className="font-geist-light text-[15px]">
            <AnimatedCharacters>
              Superbase, which is conveniently hosted at https://superbase.io,
              offers users a state-of-the-art decentralized bridge specifically
              designed for the smooth transfer of digital assets among a
              plethora of other related services.
            </AnimatedCharacters>
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            <AnimatedCharacters>
              Accessing & Using Our Platform
            </AnimatedCharacters>
          </h1>
          <ul className="list-disc ml-4">
            <li className="font-geist-light text-[15px]">
              <AnimatedCharacters>
                Wallet Connection: For an enhanced experience, users can
                seamlessly connect digital wallets, such as Metamask, to gain
                direct access to Superbase Smart Contracts.
              </AnimatedCharacters>
            </li>
            <li className="font-geist-light text-[15px]">
              <AnimatedCharacters>
                Governance: The Operator diligently oversees the Platform&apos;s
                functioning, but it&apos;s worth noting that Direct Usage
                operates independently and outside this purview.
              </AnimatedCharacters>
            </li>
            <li className="font-geist-light text-[15px]">
              <AnimatedCharacters>
                Transaction Fees: Some transactions may carry associated fees.
                Rest assured, users will always be informed and required to
                consent prior to any charges being applied.
              </AnimatedCharacters>
            </li>
            <li className="font-geist-light text-[15px]">
              <AnimatedCharacters>
                Transaction Fees: Some transactions may carry associated fees.
                Rest assured, users will always be informed and required to
                consent prior to any charges being applied.
              </AnimatedCharacters>
            </li>
          </ul>
        </div>
        <div className="fixed left-0 bottom-[-200px]">
          <div className="w-full h-[600px] flex items-end">
            <Image src={MainAssets.Mask} alt="Mask for page content" />
          </div>
        </div>
      </div>
      <Footer fixed={false} />
    </>
  );
};

export default Terms;
