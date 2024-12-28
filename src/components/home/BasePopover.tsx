import { AnimatePresence, motion } from "framer-motion";
import MainAssets from "@/lib/assets/main";
import RemoteImage from "../shared/RemoteImage";
import ExternalLink from "../shared/ExternalLink";

interface IProps {
  isPopOpen: boolean;
}

export function BasePopover({ isPopOpen }: IProps) {
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="rounded-[0.38rem] h-full"
          initial="close"
          animate="open"
          exit="close"
          variants={{
            open: {
              filter: "blur(0px)",
              transition: { duration: 0.2, delay: 0.4 },
              opacity: 1,
            },
            close: {
              filter: "blur(20px)",
              transition: { duration: 0.1 },
              opacity: 1,
            },
          }}
        >
          <div className=" w-full relative p-4 h-full">
            <div>
              <p className="text-[#737373] text-sm font-geist-medium">
                Base is a secure, low-cost, builder-friendly Ethereum L2 built
                to bring the next billion users onchain. Base is incubated
                within Coinbase and plans to progressively decentralize in the
                years ahead. We believe that decentralization is critical to
                creating an open, global crypto economy that is accessible to
                everyone.
              </p>
              <ExternalLink href="https://docs.base.org/">
                <h3 className="text-[#D7D7D7] text-sm font-geist-medium underline text-center pt-8 pb-4  border-b border-[#272727]">
                  Read Docs Here
                </h3>
              </ExternalLink>
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="flex items-center justify-center opacity-50 ">
                  <RemoteImage src={MainAssets.Base} width={16} height={16} />
                </div>
                <h1 className="text-base text-[#6E6E6E]">Base</h1>
              </div>
            </div>
            {/* <div className="mt-[3.00rem] rounded-[0.38rem] bg-transparent flex items-center justify-center gap-4">
              <Button variant="invincible" onClick={() => setIsPopOpen(false)}>
                <div className="flex items-center gap-1">
                  <div className="h-[0.88rem] w-[0.88rem]  flex items-center justify-center ">
                    <Image
                      src={MainAssets.Base}
                      alt="Left icon for the faq button"
                    />
                  </div>
                  <p className="text-[0.81rem] text-grey-100">Base on Obdisian</p>
                  <div className="h-[0.88rem] w-[0.88rem]  flex items-center justify-center ">
                    <Image
                      src={MainAssets.Minus}
                      alt="Left icon for the faq button"
                    />
                  </div>
                </div>
              </Button>
            </div> */}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
