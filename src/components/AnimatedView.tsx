import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface AnimatedViewProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: Direction;
  distance?: number;
}

const getInitial = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':    return { opacity: 0, y:  distance };
    case 'down':  return { opacity: 0, y: -distance };
    case 'left':  return { opacity: 0, x:  distance };
    case 'right': return { opacity: 0, x: -distance };
  }
};

/**
 * AnimatedView — simple fade-in animation wrapper.
 * In the new fixed layout, whileInView doesn't work reliably,
 * so we use animate directly with a slight delay.
 */
export default function AnimatedView({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 24,
}: AnimatedViewProps) {
  return (
    <motion.div
      initial={getInitial(direction, distance)}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
