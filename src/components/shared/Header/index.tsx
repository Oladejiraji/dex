import React, { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import Input from "../Input";
import { HeaderMenu } from "@/components/home/HeaderMenu";
import RenderIf from "../RenderIf";
import cx from "classnames";
import { motion } from "framer-motion";
import ConnectButton from "@/components/home/ConnectButton";

const Header = ({ type }: { type?: number }) => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === "/") {
      setIsPopOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header
        className={cx(
          "font-geist-medium fixed left-0 top-0 w-full py-7 px-8 z-[1001]",
          { "backdrop-blur-sm bg-black/30 ": !isPopOpen }
        )}
      >
        <div className="flex items-start justify-between max-w-[1200px] mx-auto">
          <Link href={AppRoutes.home.path}>
            <Button>
              <div className="flex items-center gap-1">
                <div className="h-4 w-3 mt-1">
                  <Image
                    src={MainAssets.Right}
                    alt="Left Icon for title button"
                  />
                </div>
                <p className="text-base text-grey-100">Superbase</p>
              </div>
            </Button>
          </Link>

          {/* Menu 1 */}
          <RenderIf condition={type === 1}>
            <div className="border border-[#32323240] rounded-[6px] bg-gradient-custom flex items-center gap-3 relative">
              <motion.div
                className="flex flex-col items-center z-[1002] relative menu_dropdown_bg rounded-[6px]"
                animate={{
                  height: isPopOpen ? "371px" : "40px",
                  width: "603px",
                }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className={cx(
                    "flex items-center justify-between w-full px-2 gap-0"
                  )}
                >
                  <div>
                    <Button
                      variant="invincible"
                      onClick={() => setIsPopOpen(true)}
                    >
                      <div className="flex items-center gap-1">
                        <div className="h-4 w-3  flex items-center justify-center ">
                          <Image
                            src={MainAssets.Simplify}
                            alt="Left icon for the new button"
                          />
                        </div>

                        <p className="text-[13px] text-grey-100">Simplify</p>
                      </div>
                    </Button>
                  </div>

                  <div className="w-[316px]">
                    <Input
                      onFocus={() => setIsPopOpen(true)}
                      // onBlur={() => setIsPopOpen(false)}
                      iconBefore
                      icon={MainAssets.Search}
                      inButtonClassNames="right-[0px]"
                      inButton={
                        <div className="flex items-center text-[#5F6368] font-geist-regular text-xs gap-[4px]">
                          <p className="bg-[#2A2A2A] w-[22px] h-5 flex items-center justify-center rounded-[3px]">
                            ⌘
                          </p>
                          <p className="bg-[#2A2A2A] w-[22px] h-5 flex items-center justify-center rounded-[3px]">
                            /
                          </p>
                        </div>
                      }
                      placeholder="Search for a token, address or chain"
                      className="bg-transparent border-none font-geist-medium text-[13px] text-grey-300 p-0"
                    />
                  </div>
                  <div>
                    <Link href={AppRoutes.networks.path}>
                      <Button variant="invincible">
                        <p className="text-[13px] text-grey-100">
                          Supported Networks
                        </p>
                      </Button>
                    </Link>
                  </div>
                </div>
                <HeaderMenu isPopOpen={isPopOpen} setIsPopOpen={setIsPopOpen} />
              </motion.div>
              {isPopOpen ? (
                <div
                  onClick={(e) => {
                    setIsPopOpen(false);
                  }}
                  className={cx(
                    "fixed top-0 left-0 h-screen w-screen backdrop-blur-[13px] bg-black/30",
                    { "opacity-1": !!isPopOpen },
                    { "opacity-0": !isPopOpen }
                  )}
                ></div>
              ) : null}
            </div>
            <div className="flex gap-3">
              <Button variant="ghost">
                <div className="flex items-center gap-1">
                  <div className="bg-primary-200  rounded-[4px] py-[4px] px-[6px]">
                    <div className="h-4 w-3  flex items-center justify-center ">
                      <Image
                        src={MainAssets.New}
                        alt="Left icon for the new button"
                      />
                    </div>
                  </div>
                  <p className="text-[13px] text-grey-100">New</p>
                </div>
              </Button>
              <ConnectButton />
            </div>
          </RenderIf>
          {/* Menu 2 */}
          <RenderIf condition={type === 2}>
            <div className="items-center gap-4  flex">
              <div className="border border-[#32323240] rounded-[6px] bg-gradient-custom flex items-center gap-8 relative">
                <HeaderMenu isPopOpen={isPopOpen} setIsPopOpen={setIsPopOpen} />
                <Button variant="invincible" onClick={() => setIsPopOpen(true)}>
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-3  flex items-center justify-center ">
                      <Image
                        src={MainAssets.Simplify}
                        alt="Left icon for the new button"
                      />
                    </div>

                    <p className="text-[13px] text-grey-100">Simplify</p>
                  </div>
                </Button>
                <Button variant="invincible">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-3  flex items-center justify-center ">
                      <Image
                        src={MainAssets.Search}
                        alt="Left icon for the new button"
                      />
                    </div>
                    <p className="text-[13px] text-grey-100">Search Chain</p>
                  </div>
                </Button>
              </div>
              <Button variant="ghost">
                <div className="flex items-center gap-1">
                  <div className="bg-primary-200  rounded-[4px] py-[4px] px-[6px]">
                    <div className="h-4 w-3  flex items-center justify-center ">
                      <Image
                        src={MainAssets.New}
                        alt="Left icon for the new button"
                      />
                    </div>
                  </div>
                  <p className="text-[13px] text-grey-100">New</p>
                </div>
              </Button>
              <ConnectButton />
            </div>
          </RenderIf>
          {/* Menu 3 */}
          <RenderIf condition={type === 3}>
            <div className="items-center gap-4 flex justify-between w-2/3 ">
              <div className="border border-[#32323240] rounded-[6px] bg-gradient-custom flex items-center gap-8 relative px-[10px]">
                <div className="flex items-center gap-8">
                  <div>
                    <Input
                      iconBefore
                      icon={MainAssets.Search}
                      inButton={
                        <div className="flex items-center text-[#5F6368] font-geist-regular text-xs gap-[4px]">
                          <p className="bg-[#2A2A2A] w-[22px] h-5 flex items-center justify-center rounded-[3px]">
                            ⌘
                          </p>
                          <p className="bg-[#2A2A2A] w-[22px] h-5 flex items-center justify-center rounded-[3px]">
                            /
                          </p>
                        </div>
                      }
                      placeholder="Search over 54 chains and protocol"
                      className="bg-transparent border-none font-geist-medium text-[13px] text-grey-300 p-0 min-w-[340px]"
                    />
                  </div>
                </div>
              </div>
              <ConnectButton />
            </div>
          </RenderIf>
        </div>
      </header>
    </>
  );
};

export default Header;
