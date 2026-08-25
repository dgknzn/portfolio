import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MagnetProps {
  children: ReactNode;
  /** Distance in px outside the element edge that still triggers the pull. */
  padding?: number;
  /** Higher values dampen the movement — offset is divided by this. */
  magnetStrength?: number;
  disabled?: boolean;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

export default function Magnet({
  children,
  padding = 100,
  magnetStrength = 2,
  disabled = false,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const inert = disabled || reduce;

  useEffect(() => {
    if (inert) {
      setIsActive(false);
      setOffset({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const node = wrapperRef.current;
      if (!node) return;

      const { left, top, width, height } = node.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      const withinReach =
        distX < width / 2 + padding && distY < height / 2 + padding;

      if (withinReach) {
        setIsActive(true);
        setOffset({
          x: (e.clientX - centerX) / magnetStrength,
          y: (e.clientY - centerY) / magnetStrength,
        });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, inert, magnetStrength]);

  return (
    <div ref={wrapperRef} className={wrapperClassName}>
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
