import { useCallback, useLayoutEffect, useRef } from 'react';

/**
 * Shrinks a single-line heading just enough to fit its container.
 * The Tailwind vw sizes stay the design baseline — this only kicks in when a
 * longer string (a name, an e-mail address) would otherwise be clipped.
 *
 * The size is applied straight to the node rather than through state: fit()
 * has to clear the previous value before it can measure, and a state round
 * trip that resolves to the same value bails out of rendering, which would
 * leave the element with no size at all.
 *
 * Runs in a layout effect so the correction lands before paint, and
 * re-measures on container resize and webfont load — both change the natural
 * text width after first render.
 */
export function useFitText<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const lastWidth = useRef(-1);

  const fit = useCallback(() => {
    const node = ref.current;
    const parent = node?.parentElement;
    if (!node || !parent) return;

    node.style.fontSize = '';
    const base = parseFloat(getComputedStyle(node).fontSize);
    const available = parent.clientWidth;
    const natural = node.scrollWidth;
    lastWidth.current = available;

    if (available > 0 && natural > available) {
      node.style.fontSize = `${base * (available / natural)}px`;
    }
  }, []);

  useLayoutEffect(() => {
    lastWidth.current = -1;
    fit();

    const parent = ref.current?.parentElement;
    // Only react to width changes — shrinking the text changes the parent's
    // height, which would otherwise bounce the observer straight back.
    const observer =
      parent && typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            if (parent.clientWidth !== lastWidth.current) fit();
          })
        : null;
    observer?.observe(parent!);

    let cancelled = false;
    document.fonts?.ready.then(() => !cancelled && fit()).catch(() => {});

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fit, ...deps]);

  return ref;
}
