import { useEffect, useState } from 'react';

// Shared, restrained motion values for controls, navigation and physical cards.
export const motion = Object.freeze({
 duration: { feedback: 150, short: 220, navigation: 340, sheet: 520 },
 spring: {
  control: { stiffness: 360, damping: 30, mass: 0.82 },
  card: { stiffness: 235, damping: 27, mass: 1 },
 },
});

const query = '(prefers-reduced-motion: reduce)';
export function useReducedMotion() {
 const [reduced, setReduced] = useState(() => typeof matchMedia === 'function' && matchMedia(query).matches);
 useEffect(() => {
  if (typeof matchMedia !== 'function') return undefined;
  const media = matchMedia(query);
  const update = () => setReduced(media.matches);
  media.addEventListener?.('change', update);
  return () => media.removeEventListener?.('change', update);
 }, []);
 return reduced;
}
