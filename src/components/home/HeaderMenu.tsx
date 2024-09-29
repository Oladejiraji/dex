import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  isPopOpen: boolean;
  setIsPopOpen: Dispatch<SetStateAction<boolean>>;
}

export function HeaderMenu({ isPopOpen, setIsPopOpen }: IProps) {
  return (
    <AnimatePresence>
      {isPopOpen ? (
        <motion.div
          className="absolute left-0 top-[41px] z-[10000000]  menu_gradient shadow-[0px 0px 0px 1px #32323240] blur-[24px] rounded-b-[6px] w-full h-[371px]"
          initial={{ height: 0 }}
          animate={{ height: "371px" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" w-full relative p-4 h-full"></div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
