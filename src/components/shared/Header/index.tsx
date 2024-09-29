import React, { useState } from "react";
import Button from "../Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";
import Input from "../Input";
import { HeaderMenu } from "@/components/home/HeaderMenu";
import RenderIf from "../RenderIf";

const Header = ({ type }: { type?: number }) => {
  const [isPopOpen, setIsPopOpen] = useState(false);
  return (
    <header className="font-geist-medium fixed left-0 top-0 w-full py-7 px-8 z-[1000]  backdrop-blur-sm bg-black/30  ">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
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
          <div className="items-center gap-4 flex menu_gradient">
            <div className="border border-[#32323240] rounded-[6px] bg-gradient-custom flex items-center gap-8 relative">
              {/* <HeaderMenu isPopOpen={isPopOpen} setIsPopOpen={setIsPopOpen} /> */}
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
                    placeholder="Search for a token, address or chain"
                    className="bg-transparent border-none font-geist-medium text-[13px] text-grey-300 p-0 min-w-[370px]"
                  />
                </div>
                <Link href={AppRoutes.networks.path}>
                  <Button variant="invincible">
                    <p className="text-[13px] text-grey-100">
                      Supported Networks
                    </p>
                  </Button>
                </Link>
              </div>
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
            <Link href={AppRoutes.connect.path}>
              <Button>
                <p className="text-[13px] text-grey-100">Connect Wallet</p>
              </Button>
            </Link>
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
            <Link href={AppRoutes.connect.path}>
              <Button>
                <p className="text-[13px] text-grey-100">Connect Wallet</p>
              </Button>
            </Link>
          </div>
        </RenderIf>
        {/* Menu 3 */}
        <RenderIf condition={type === 3}>
          <div className="items-center gap-4 flex justify-between w-2/3 ">
            <div className="border border-[#32323240] rounded-[6px] bg-gradient-custom flex items-center gap-8 relative">
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
                    placeholder="Search for a token, address or chain"
                    className="bg-transparent border-none font-geist-medium text-[13px] text-grey-300 p-0 min-w-[370px]"
                  />
                </div>
              </div>
            </div>
            <Link href={AppRoutes.connect.path}>
              <Button>
                <p className="text-[13px] text-grey-100">Connect Wallet</p>
              </Button>
            </Link>
          </div>
        </RenderIf>
      </div>
    </header>
  );
};

export default Header;
