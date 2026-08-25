import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function Char({ char, progress, range }: CharProps) {
  const reduce = useReducedMotion();
  const scrolled = useTransform(progress, range, [0.2, 1]);
  const opacity = reduce ? 1 : scrolled;

  return (
    <span className="relative inline-block">
      {/* Invisible placeholder keeps the natural text metrics intact. */}
      <span className="opacity-0">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({
  text,
  className = '',
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalChars = text.length;
  let charIndex = 0;

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const wordStart = charIndex;
        charIndex += word.length + 1; // +1 for the space that follows

        return (
          <span key={`${word}-${wordIdx}`} className="inline-block">
            {word.split('').map((char, i) => {
              const index = wordStart + i;
              const start = index / totalChars;
              const end = (index + 1) / totalChars;

              return (
                <Char
                  key={`${char}-${i}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
            {wordIdx < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </p>
  );
}
