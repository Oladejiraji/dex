import React from "react";
import Button from "../shared/Button";
import { useWalletInfo, useWeb3Modal } from "@web3modal/wagmi/react";
import Image from "next/image";

const ConnectButton = () => {
  const { open } = useWeb3Modal();
  const { walletInfo } = useWalletInfo();
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
    <Button onClick={() => open({ view: "AllWallets" as any })}>
      <p className="text-[13px] text-grey-100">Connect Wallet</p>
    </Button>
  );
};

export default ConnectButton;
