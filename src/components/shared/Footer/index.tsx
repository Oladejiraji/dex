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
import OnChain from "@/lib/svg/OnChain";
import Question from "@/lib/svg/Question";

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
          { fixed: !!fixed },
          { relative: !fixed }
        )}
      >
        <div className="flex items-end justify-between max-w-[75.00rem] mx-auto">
          <div className="flex flex-1">
            <div className="border border-[#32323240] rounded-[0.38rem] bg-transparent flex items-center justify-between gap-4">
              <Link href={AppRoutes.terms.path}>
                <Button variant="invincible" className="group">
                  <div className="flex items-center gap-1">
                    <div className="h-[0.88rem] w-[0.88rem]  flex items-center justify-center ">
                      <Question className="transition-colors fill-[#919191] group-hover:fill-white " />
                    </div>

                    <p className="text-[0.81rem] transition-colors text-[#919191] group-hover:text-white">
                      Terms and Privacy
                    </p>
                  </div>
                </Button>
              </Link>
              <Link href={AppRoutes.faq.path}>
                <Button variant="invincible" className="group">
                  <div className="flex items-center gap-1">
                    <div className="h-[0.88rem] w-[0.88rem]  flex items-center justify-center ">
                      <Question className="transition-colors fill-[#919191] group-hover:fill-white " />
                    </div>
                    <p className="text-[0.81rem] transition-colors text-[#919191] group-hover:text-white">
                      FAQs
                    </p>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
          <RenderIf condition={!!expand}>
            <div className="flex justify-center flex-1 ">
              <motion.div
                className="relative border border-[#32323240] rounded-[0.38rem]  flex items-end justify-center gap-4 bg-transparent overflow-hidden"
                animate={{
                  width: isMenuOpen ? "351px" : "140px",
                  height: isMenuOpen ? "329px" : "40px",
                }}
              >
                <div className="flex flex-col gradient_border base_popover_gradient">
                  <BasePopover isPopOpen={isMenuOpen} />
                  <Button
                    variant="invincible"
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    className="z-[1000] group"
                  >
                    <div className="flex items-center gap-1">
                      <div className="h-[0.88rem] w-[0.88rem]  flex items-center justify-center ">
                        <OnChain className="transition-colors fill-[#919191] group-hover:fill-white " />
                      </div>
                      <p className="text-[0.81rem] transition-colors text-[#919191] group-hover:text-white">
                        Base Onchain
                      </p>
                      <div className="h-[0.88rem] w-[0.88rem] flex items-center justify-center ">
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
