'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'easeInOut', duration: 0.75 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
