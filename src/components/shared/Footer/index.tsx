import React from "react";
import Button from "../Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";

const Footer = () => {
  return (
    <footer className="font-geist-medium fixed bottom-0 left-0 w-full pb-14 ">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        <div className="border border-[#32323240] rounded-[6px] bg-transparent flex items-center justify-between gap-4">
          <Button variant="invincible">
            <div className="flex items-center gap-1">
              <div className="h-[14px] w-[14px]  flex items-center justify-center ">
                <Image
                  src={MainAssets.Faq}
                  alt="Left icon for the terms and condition button"
                />
              </div>

              <p className="text-[13px] text-grey-100">Terms and Privacy</p>
            </div>
          </Button>
          <Button variant="invincible">
            <div className="flex items-center gap-1">
              <div className="h-[14px] w-[14px]  flex items-center justify-center ">
                <Image
                  src={MainAssets.Faq}
                  alt="Left icon for the faq button"
                />
              </div>
              <p className="text-[13px] text-grey-100">FAQs</p>
            </div>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
