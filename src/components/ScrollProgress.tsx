import { motion } from 'motion/react';
import { useScroll, useSpring } from 'motion/react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{ scaleX, background: 'linear-gradient(90deg, #DC1E1E, #F87171)' }}
    />
  );
};

export default ScrollProgress;
