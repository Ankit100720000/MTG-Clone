import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  sub?: string;
  cta?: React.ReactNode;
}

const SectionHead = ({ eyebrow, title, sub, cta }: SectionHeadProps) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-end justify-between mb-8 flex-wrap gap-4"
    >
      <div>
        <div className="section-label">{eyebrow}</div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-on-surface tracking-tight">{title}</h2>
        {sub && <p className="text-on-surface-dim text-sm mt-1.5 max-w-lg">{sub}</p>}
      </div>
      {cta}
    </motion.div>
  );
};

export default SectionHead;
