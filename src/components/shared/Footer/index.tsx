"use client";
import React, { useState } from "react";
import Button from "../Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import RenderIf from "../RenderIf";
import { motion } from "framer-motion";
import { BasePopover } from "@/components/home/BasePopover";
import cx from "classnames";

const Footer = ({
  expand,
  fixed = true,
}: {
  expand?: boolean;
  fixed?: boolean;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <footer
        className={cx(
          "font-geist-medium  bottom-0 left-0 w-full pb-14 z-[1000] ",
          { fixed: !!fixed }
        )}
      >
        <div className="flex items-end justify-between max-w-[1200px] mx-auto">
          <div className="flex flex-1">
            <div className="border border-[#32323240] rounded-[6px] bg-transparent flex items-center justify-between gap-4">
              <Link href={AppRoutes.terms.path}>
                <Button variant="invincible">
                  <div className="flex items-center gap-1">
                    <div className="h-[14px] w-[14px]  flex items-center justify-center ">
                      <Image
                        src={MainAssets.Faq}
                        alt="Left icon for the terms and condition button"
                      />
                    </div>

                    <p className="text-[13px] text-grey-100">
                      Terms and Privacy
                    </p>
                  </div>
                </Button>
              </Link>
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
          <RenderIf condition={!!expand}>
            <div className="flex justify-center flex-1 ">
              <motion.div
                className="relative border border-[#32323240] rounded-[6px]  flex items-end justify-center gap-4 bg-transparent overflow-hidden"
                animate={{
                  width: isMenuOpen ? "351px" : "140px",
                  height: isMenuOpen ? "329px" : "40px",
                }}
              >
                <div className="flex flex-col gradient_border base_popover_gradient">
                  <BasePopover
                    isPopOpen={isMenuOpen}
                    setIsPopOpen={setIsMenuOpen}
                  />
                  <Button
                    variant="invincible"
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    className="z-[1000]"
                  >
                    <div className="flex items-center gap-1">
                      <div className="h-[14px] w-[14px]  flex items-center justify-center ">
                        <Image
                          src={MainAssets.Base}
                          alt="Left icon for the faq button"
                        />
                      </div>
                      <p className="text-[13px] text-grey-100">Base Onchain</p>
                      <div className="h-[14px] w-[14px]  flex items-center justify-center ">
                        <Image
                          src={isMenuOpen ? MainAssets.Minus : MainAssets.Plus}
                          alt="Left icon for the faq button"
                        />
                      </div>
                    </div>
                  </Button>
                </div>
              </motion.div>
            </div>
            <div className="flex-1"></div>
          </RenderIf>
        </div>
      </footer>
    </>
  );
};

export default Footer;
