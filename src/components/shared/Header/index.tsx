import React from "react";
import Button from "../Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
import Link from "next/link";
import { AppRoutes } from "@/utils/routes";

const Header = () => {
  return (
    <header className="font-geist-medium fixed left-0 top-0 w-full py-7 px-8 z-[1000]  backdrop-blur-sm bg-black/30  ">
      <div className="flex items-center justify-between max-w-[1200px] mx-auto">
        <div>
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
        </div>
        <div className="items-center gap-4 hidden">
          <div className="border border-[#32323240] rounded-[6px] bg-gradient-custom">
            <Button variant="invincible">
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
      </div>
    </header>
  );
};

export default Header;
