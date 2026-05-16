import { motion } from 'motion/react';
import { useScroll, useSpring } from 'motion/react';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-100"
        style={{ 
          scaleX, 
          background: 'linear-gradient(90deg, #E52D27, #F43F5E, #FF6B6B, #E52D27)',
          backgroundSize: '200% 100%',
        }}
      />
      {/* Glow effect under the progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[8px] origin-left z-99 blur-sm"
        style={{ 
          scaleX, 
          background: 'linear-gradient(90deg, #E52D27, #F43F5E)',
          opacity: 0.4,
        }}
      />
    </>
  );
};

export default ScrollProgress;
