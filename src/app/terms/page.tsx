"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import MainAssets from "@/lib/assets/main";
import { AppRoutes } from "@/utils/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

const Terms = () => {
  const contentRef = useRef<HTMLDivElement>(null!);

  const wrapTextInSpans = (node: HTMLDivElement | ChildNode) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const words = child.textContent!.split(" ").map((word) => {
          const span = document.createElement("span");
          span.textContent = `${word} `;
          span.classList.add("text-[#848A8C]");
          span.classList.add("transition-all");
          return span;
        });
        words.forEach((wordSpan) => {
          node.insertBefore(wordSpan, child);
        });
        node.removeChild(child);
      } else {
        wrapTextInSpans(child);
      }
    });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    const spans = document.querySelectorAll("span");
    const wordCount = Math.floor(scrollPercent * spans.length);
    spans.forEach((span, index) => {
      if (index < wordCount) {
        span.classList.remove("text-[#848A8C]");
        span.classList.add("text-white");
      } else {
        span.classList.remove("text-white");
        span.classList.add("text-[#848A8C]");
      }
    });
  };

  useEffect(() => {
    const content = contentRef.current;
    wrapTextInSpans(content);

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header type={1} />
      <div
        className="text-[#848A8C] max-w-[566px] mx-auto mt-[150px] mb-[20px] relative"
        ref={contentRef}
      >
        <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] z-[-1]" />
        <div className="pb-6">
          <h1 className="text-[#8C8487] text-base font-geist-medium pb-3 ">
            Superbase
          </h1>
          <h1 className="font-geist-bold text-2xl">Terms</h1>
          <p className="font-geist-medium text-base mix-blend-color">
            Latest Revision: 3rd of June 2024
          </p>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">Introduction</h1>
          <p className="font-geist-medium text-[15px]">
            Welcome to Superbase. Before you delve into and engage with our
            comprehensive range of services, it&apos;s crucial to familiarize
            yourself with and accept our Terms of Service and Privacy Policy.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">Acceptance of Terms</h1>
          <p className="font-geist-medium text-[15px]">
            By accessing or utilizing the Superbase Offerings, you are
            confirming your understanding and unconditional acceptance of these
            Terms and the accompanying Privacy Policy. Furthermore, you ensure
            that you have the legal capacity and authority to enter into and be
            bound by these Terms.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            Description of Our Services
          </h1>
          <p className="font-geist-medium text-[15px]">
            Superbase, which is conveniently hosted at https://superbase.io,
            offers users a state-of-the-art decentralized bridge specifically
            designed for the smooth transfer of digital assets among a plethora
            of other related services.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">1. DEFINITIONS</h1>
          <p className="font-geist-medium text-[15px]">
            1.1 Platform: The website, app, or any software provided by
            Superbase for bridge aggregation services.
          </p>
          <p className="font-geist-medium text-[15px]">
            1.2 User: Any individual or entity accessing or using the Platform.
          </p>
          <p className="font-geist-medium text-[15px]">
            1.3 Bridges: Third-party services used to facilitate the transfer of
            digital assets across blockchain networks.
          </p>
          <p className="font-geist-medium text-[15px]">
            1.4 Digital Assets: Cryptocurrencies, tokens, or other digital
            representations of value.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">2. ELIGIBILITY</h1>
          <p className="font-geist-medium text-[15px]">
            2.1 You must be at least 18 years old and have the legal capacity to
            enter into agreements to use the Platform.
          </p>
          <p className="font-geist-medium text-[15px]">
            2.2 The Platform may not be available in certain jurisdictions due
            to legal restrictions. It is your responsibility to ensure
            compliance with applicable laws.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">3. SERVICES</h1>
          <p className="font-geist-medium text-[15px]">
            3.1 Superbase acts as an aggregator of bridges, enabling Users to
            find optimal routes for transferring Digital Assets between
            blockchain networks.
          </p>
          <p className="font-geist-medium text-[15px]">
            3.2 Superbase does not custody Digital Assets or control third-party
            bridges. Transactions are executed on external protocols, and
            Superbase is not liable for any issues arising from their use.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            4. USER RESPONSIBILITIES
          </h1>
          <p className="font-geist-medium text-[15px]">
            4.1 Accuracy of Information: You are responsible for ensuring all
            transaction details (e.g., wallet addresses, blockchain networks)
            are accurate.
          </p>
          <p className="font-geist-medium text-[15px]">
            4.2 Compliance: You must comply with all applicable laws, including
            anti-money laundering (AML) and know-your-customer (KYC)
            requirements, if any.
          </p>
          <p className="font-geist-medium text-[15px]">
            4.3 Risks: By using Superbase, you acknowledge the inherent risks of
            blockchain technology, including but not limited to smart contract
            failures, bridge outages, and market volatility.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">5. FEES</h1>
          <p className="font-geist-medium text-[15px]">
            5.1 Superbase may charge fees for services rendered. These fees will
            be displayed transparently before transaction confirmation.
          </p>
          <p className="font-geist-medium text-[15px]">
            5.2 Additional fees may be charged by third-party bridges, for which
            Superbase is not responsible.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            6. DISCLAIMER OF WARRANTIES
          </h1>
          <p className="font-geist-medium text-[15px]">
            6.1 The Platform is provided "as is" and "as available" without
            warranties of any kind, whether express or implied, including but
            not limited to warranties of merchantability, fitness for a
            particular purpose, and non-infringement.
          </p>
          <p className="font-geist-medium text-[15px]">
            6.2 Superbase does not guarantee uninterrupted or error-free
            operation of the Platform.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            7. LIMITATION OF LIABILITY
          </h1>
          <p className="font-geist-medium text-[15px]">
            7.1 To the fullest extent permitted by law, Superbase shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including loss of Digital Assets or revenue.
          </p>
          <p className="font-geist-medium text-[15px]">
            7.2 Superbase's total liability shall not exceed the amount of fees
            paid by the User to Superbase for the preceding three months.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            8. THIRD-PARTY SERVICES
          </h1>
          <p className="font-geist-medium text-[15px]">
            8.1 Superbase integrates with third-party bridges but does not
            control their operations. Use of such services is at your own risk.
          </p>
          <p className="font-geist-medium text-[15px]">
            8.2 Superbase is not responsible for any losses incurred due to
            third-party bridge failures, delays, or other issues.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">9. TERMINATION</h1>
          <p className="font-geist-medium text-[15px]">
            9.1 Superbase reserves the right to suspend or terminate your access
            to the Platform at its sole discretion, with or without notice, for
            any reason, including but not limited to breach of these Terms.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">10. PRIVACY POLICY</h1>
          <p className="font-geist-medium text-[15px]">
            10.1 Superbase's collection and use of User data are governed by its
            Privacy Policy, available{" "}
            <Link href={AppRoutes.privacy.path}>
              <span className="underline">here</span>
            </Link>
            .
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            11. MODIFICATIONS TO TERMS
          </h1>
          <p className="font-geist-medium text-[15px]">
            11.1 Superbase reserves the right to update these Terms at any time.
            Notice of changes will be provided via the Platform or email.
            Continued use constitutes acceptance of the revised Terms.
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            12. GOVERNING LAW AND DISPUTE RESOLUTION
          </h1>
          <p className="font-geist-medium text-[15px]">
            12.1 These Terms are governed by the laws of [Jurisdiction].
          </p>
          <p className="font-geist-medium text-[15px]">
            12.2 Any disputes arising under these Terms shall be resolved
            through arbitration in accordance with the rules of [Arbitration
            Organization], with the venue in [City, Country].
          </p>
        </div>
        <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            13. CONTACT INFORMATION
          </h1>
          <p className="font-geist-medium text-[15px]">
            For questions or concerns regarding these Terms, please contact us
            at support@superbase.com.
          </p>
        </div>

        {/* <div className="pb-6">
          <h1 className="font-geist-medium text-[18px]">
            Accessing & Using Our Platform
          </h1>
          <ul className="list-disc ml-4">
            <li className="font-geist-medium text-[15px]">
              Wallet Connection: For an enhanced experience, users can
              seamlessly connect digital wallets, such as Metamask, to gain
              direct access to Superbase Smart Contracts.
            </li>
            <li className="font-geist-medium text-[15px]">
              Governance: The Operator diligently oversees the Platform&apos;s
              functioning, but it&apos;s worth noting that Direct Usage operates
              independently and outside this purview.
            </li>
            <li className="font-geist-medium text-[15px]">
              Transaction Fees: Some transactions may carry associated fees.
              Rest assured, users will always be informed and required to
              consent prior to any charges being applied.
            </li>
            <li className="font-geist-medium text-[15px]">
              Transaction Fees: Some transactions may carry associated fees.
              Rest assured, users will always be informed and required to
              consent prior to any charges being applied.
            </li>
          </ul>
        </div> */}
        <div className="fixed left-0 bottom-[-200px] pointer-events-none">
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
