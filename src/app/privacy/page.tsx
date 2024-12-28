"use client";

import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import MainAssets from "@/lib/assets/main";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const Privacy = () => {
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
        className="text-[#848A8C] max-w-[35.38rem] mx-auto mt-[9.38rem] mb-[1.25rem] relative"
        ref={contentRef}
      >
        <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.5)] z-[-1]" />
        <div className="pb-6">
          <h1 className="text-[#8C8487] text-base font-geist-medium pb-3 ">
            Superbase
          </h1>
          <h1 className="font-geist-bold text-2xl">Privacy</h1>
          <p className="font-geist-medium text-base mix-blend-color">
            Latest Revision: 9th of December 2024
          </p>
        </div>

        <div className="pb-6">
          <p className="font-geist-medium text-[0.94rem]">
            Superbase is committed to protecting your privacy. This Privacy
            Policy outlines how we collect, use, and safeguard your personal
            information when you use our platform.
          </p>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">
            1. INFORMATION WE COLLECT
          </h1>
          <ul className="list-disc ml-4">
            <li className="font-geist-medium text-[0.94rem]">
              Personal Information: Includes email addresses, wallet addresses,
              and other identifiable details provided by the User.
            </li>
            <li className="font-geist-medium text-[0.94rem]">
              Usage Data: Information about your interactions with the platform,
              such as transaction history, device information, and analytics.
            </li>
          </ul>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">
            2. HOW WE USE YOUR INFORMATION
          </h1>
          <ul className="list-disc ml-4">
            <li className="font-geist-medium text-[0.94rem]">
              To provide and improve our services.
            </li>
            <li className="font-geist-medium text-[0.94rem]">
              To communicate with you regarding updates, promotional offers, or
              customer support.
            </li>
          </ul>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">3. DATA SHARING</h1>
          <ul className="list-disc ml-4">
            <li className="font-geist-medium text-[0.94rem]">
              No Selling of Data: We do not sell your data.
            </li>
            <li className="font-geist-medium text-[0.94rem]">
              Service Functionality: We may share your information with
              third-party partners for service functionality (e.g., bridge
              providers).
            </li>
            <li className="font-geist-medium text-[0.94rem]">
              Legal Obligations: We may disclose data when required by law or to
              prevent fraudulent activities.
            </li>
          </ul>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">4. SECURITY</h1>
          <p className="font-geist-medium text-[0.94rem]">
            We implement industry-standard encryption and security measures to
            protect your data. However, no system is entirely secure.
          </p>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">5. YOUR RIGHTS</h1>
          <p className="font-geist-medium text-[0.94rem]">
            You may access, update, or delete your data by contacting us at{" "}
            <a href="mailto:support@superbase.com">support@superbase.com</a>.
          </p>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">
            6. CHANGES TO THIS POLICY
          </h1>
          <p className="font-geist-medium text-[0.94rem]">
            We may update this Privacy Policy from time to time. Changes will be
            posted on this page with the revised effective date.
          </p>
        </div>

        <div className="pb-6">
          <h1 className="font-geist-medium text-[1.13rem]">
            7. CONTACT INFORMATION
          </h1>
          <p className="font-geist-medium text-[0.94rem]">
            For questions or concerns, please contact us at{" "}
            <a href="mailto:support@superbase.com">support@superbase.com</a>.
          </p>
        </div>

        <div className="fixed left-0 bottom-[-200px]">
          <div className="w-full h-[37.50rem] flex items-end">
            <Image src={MainAssets.Mask} alt="Mask for page content" />
          </div>
        </div>
      </div>
      <Footer fixed={false} />
    </>
  );
};

export default Privacy;
