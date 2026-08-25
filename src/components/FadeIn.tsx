import { useMemo } from 'react';
import type { CSSProperties, ElementType, ReactNode, Ref } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FadeInProps {
  children?: ReactNode;
  /** Element type to render — defaults to a div. */
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  /** Forwarded to the rendered DOM node. */
  innerRef?: Ref<never>;
}

const EASE = [0.25, 0.1, 0.25, 1] as const;

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  innerRef,
  ...rest
}: FadeInProps & Record<string, unknown>) {
  const MotionTag = useMemo(() => motion.create(as as ElementType), [as]);
  const reduce = useReducedMotion();

  // With reduced motion the content still fades, it just doesn't travel.
  const from = reduce ? { opacity: 0, x: 0, y: 0 } : { opacity: 0, x, y };

  return (
    <MotionTag
      ref={innerRef}
      className={className}
      style={style}
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration: reduce ? 0.2 : duration, delay: reduce ? 0 : delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
