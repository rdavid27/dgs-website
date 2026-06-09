/* ============================================================
   PageTransition.jsx — Smooth framer-motion page wrapper
   ============================================================ */
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  in:      { opacity: 1, y: 0 },
  out:     { opacity: 0, y: -8 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.38,
};

const PageTransition = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
  >
    {children}
  </motion.div>
);

export default PageTransition;
