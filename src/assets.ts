/**
 * Self-hosted images. These used to be hot-linked from a third-party Figma
 * preview URL; if that host had gone away the whole hero would have gone with
 * it. Intrinsic dimensions are exported so every <img> can reserve its space
 * and avoid layout shift.
 */
export interface Asset {
  src: string;
  width: number;
  height: number;
}

export const AVATAR: Asset = { src: '/img/avatar.webp', width: 760, height: 1211 };

export const DECOR: Record<'moon' | 'lego' | 'orb' | 'cursor', Asset> = {
  moon: { src: '/img/moon.webp', width: 420, height: 420 },
  lego: { src: '/img/lego.webp', width: 420, height: 511 },
  orb: { src: '/img/orb.webp', width: 360, height: 382 },
  cursor: { src: '/img/cursor.webp', width: 440, height: 432 },
};
