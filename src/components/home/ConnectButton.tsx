import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import Button from '../shared/Button';
import Image from 'next/image';
import MainAssets from '@/lib/assets/main';
import { useAccount } from 'wagmi';
import ChainSwitcher from './ChainSwitcher';
import { minimizeAddress } from '@/utils/helpers';
const ConnectButton = () => {
  const account = useAccount();
  return (
    <div className="flex min-w-[108px] items-center gap-3 lg:gap-[0.625rem]">
      {account.status === 'connected' ? (
        <div>
          <ChainSwitcher />
        </div>
      ) : null}
      <RainbowConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;
          return (
            <div
              className="h-auto lg:h-10"
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} className="group">
                      <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">
                        Connect Wallet
                      </p>
                    </Button>
                  );
                }
                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} className="group">
                      <p className="text-[0.81rem] text-[#919191] transition-colors group-hover:text-white">
                        Wrong network
                      </p>
                    </Button>
                  );
                }
                return (
                  <>
                    <button onClick={openAccountModal} className="hidden lg:block">
                      {account.ensAvatar ? (
                        <Image src={chain.iconUrl || ''} alt="Wallet Icon" width={40} height={40} priority />
                      ) : (
                        <Image src={MainAssets.CustomAvatarAsset} alt="Wallet Icon" width={40} height={40} priority />
                      )}
                    </button>
                    <button
                      onClick={openAccountModal}
                      className="block h-8 rounded-[0.375rem] border border-[#131415] px-[0.625rem] lg:hidden"
                    >
                      <p className="text-neutral font-geist-medium text-[#CDCDCD]">
                        {minimizeAddress(account.address)}
                      </p>
                    </button>
                  </>
                );
              })()}
            </div>
          );
        }}
      </RainbowConnectButton.Custom>
    </div>
  );
};

export default ConnectButton;
