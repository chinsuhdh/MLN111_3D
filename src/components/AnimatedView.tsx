import { motion } from 'motion/react';
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

export default function AnimatedView({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  distance = 32,
}: AnimatedViewProps) {
  return (
    <motion.div
      initial={getInitial(direction, distance)}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
