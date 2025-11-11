// Store for handling counter state

// Define a simple counter state
export const counterState = {
  count: 0,
  increment: () => counterState.count++,
  decrement: () => counterState.count--,
};
