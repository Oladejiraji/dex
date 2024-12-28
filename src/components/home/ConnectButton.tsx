import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import Button from "../shared/Button";
import Image from "next/image";
import MainAssets from "@/lib/assets/main";
const ConnectButton = () => {
  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            className="h-10"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} className="group">
                    <p className="text-[0.81rem] transition-colors text-[#919191] group-hover:text-white">
                      Connect Wallet
                    </p>
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button onClick={openChainModal} className="group">
                    <p className="text-[0.81rem] transition-colors text-[#919191] group-hover:text-white">
                      Wrong network
                    </p>
                  </Button>
                );
              }
              return (
                <button onClick={openAccountModal}>
                  {account.ensAvatar ? (
                    <Image
                      src={chain.iconUrl || ""}
                      alt="Wallet Icon"
                      width={40}
                      height={40}
                      priority
                    />
                  ) : (
                    <Image
                      src={MainAssets.CustomAvatarAsset}
                      alt="Wallet Icon"
                      width={40}
                      height={40}
                      priority
                    />
                  )}
                </button>
              );
            })()}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
};

export default ConnectButton;
