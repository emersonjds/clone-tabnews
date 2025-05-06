import React from 'react';
import { atom, useAtom } from 'jotai';

// Define a Jotai atom for managing the state
const countAtom = atom(0);

function Home() {
  // Use the atom in the component
  const [count, setCount] = useAtom(countAtom);

  // Example function to increment the count
  const increment = () => {
    setCount((prev) => prev + 1); // Update state atomically
  };

  return (
    <div>
      <h1>Welcome to the Home Component</h1>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increment Count</button>
    </div>
  );
}

export default Home;