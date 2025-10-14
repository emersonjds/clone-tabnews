import { atom } from 'jotai';

// Create a basic atom to store the counter value
export const counterAtom = atom(0);

// Create a derived atom that doubles the counter value
export const doubleCountAtom = atom(
  (get) => get(counterAtom) * 2
);

// Create a writable derived atom that increments the counter
export const incrementAtom = atom(
  (get) => get(counterAtom),
  (get, set) => set(counterAtom, get(counterAtom) + 1)
);

// Create a writable derived atom that decrements the counter
export const decrementAtom = atom(
  (get) => get(counterAtom),
  (get, set) => set(counterAtom, get(counterAtom) - 1)
);