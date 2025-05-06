import React, { useState } from 'react';

function Home() {
  // Using useState hook to manage state
  const [count, setCount] = useState(0);

  // Example of a function
  const increment = () => {
    setCount(count + 1); // Updates the state
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