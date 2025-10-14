import React from 'react';
import { useAtom } from 'jotai';
import { counterAtom, doubleCountAtom, incrementAtom, decrementAtom } from './atoms';

export default function Counter() {
  // Read the counter value from the atom
  const [count] = useAtom(counterAtom);
  
  // Read the doubled counter value
  const [doubleCount] = useAtom(doubleCountAtom);
  
  // Get the increment and decrement functions
  const [, increment] = useAtom(incrementAtom);
  const [, decrement] = useAtom(decrementAtom);

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px auto', 
      maxWidth: '500px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h2>Jotai Counter Example</h2>
      
      <div style={{ margin: '20px 0' }}>
        <p>Current Count: <strong>{count}</strong></p>
        <p>Double Count: <strong>{doubleCount}</strong></p>
      </div>
      
      <div>
        <button 
          onClick={decrement}
          style={{
            padding: '8px 16px',
            margin: '0 8px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Decrement
        </button>
        
        <button 
          onClick={increment}
          style={{
            padding: '8px 16px',
            margin: '0 8px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment
        </button>
      </div>
    </div>
  );
}