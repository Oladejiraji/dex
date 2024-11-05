import React from "react";
import Button from "../shared/Button";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
  console.log(walletInfo);
  return walletInfo ? (
    <div>
      <Image
        src={walletInfo.icon || ""}
        alt="Wallet Icon"
        width={40}
        height={40}
      />
    </div>
  ) : (
    <Button
      onClick={() => open({ view: "AllWallets" as any })}
      className="group"
    >
      <p className="text-[13px] transition-colors text-[#919191] group-hover:text-white">
        Connect Wallet
      </p>
    </Button>
  );
};

export default ConnectButton;
