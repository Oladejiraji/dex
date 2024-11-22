"use client";
import React from "react";
import cx from "classnames";
import ExternalLink from "../ExternalLink";

const ConnectFooter = ({ fixed = true }: { fixed?: boolean }) => {
  return (
    <>
      <footer
        className={cx(
          "font-geist-medium  bottom-0 left-0 w-full pb-14 z-[1000] ",
          { fixed: !!fixed }
        )}
      >
        <div className="flex items-end justify-between max-w-[1200px] mx-auto">
          <div className="flex flex-1 gap-[4px] items-center">
            <p className="text-[15px] font-geist-medium text-[#919191]">
              Powered by
            </p>
            <ExternalLink href="https://www.socket.tech/">
              <p className="text-[16px] font-geist-semibold text-[#ffffff]">
                Socket
              </p>
            </ExternalLink>
          </div>
          {/* <div className="flex justify-center flex-1 ">
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
                />
                <Button
                  variant="invincible"
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                  className="z-[1000] group"
                >
                  <div className="flex items-center gap-1">
                    <div className="h-[14px] w-[14px]  flex items-center justify-center ">
                      <OnChain className="transition-colors fill-[#919191] group-hover:fill-white " />
                    </div>
                    <p className="text-[13px] transition-colors text-[#919191] group-hover:text-white">
                      Base Onchain
                    </p>
                    <div className="h-[14px] w-[14px] flex items-center justify-center ">
                      <Image
                        src={isMenuOpen ? MainAssets.Minus : MainAssets.Plus}
                        alt="Left icon for the faq button"
                      />
                    </div>
                  </div>
                </Button>
              </div>
            </motion.div>
          </div> */}
          <div className="flex-1"></div>
        </div>
      </footer>
    </>
  );
};

export default ConnectFooter;
