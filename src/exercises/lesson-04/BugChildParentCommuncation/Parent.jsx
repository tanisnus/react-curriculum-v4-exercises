import { useState } from 'react';
import Child from './Child';

export default function Parent() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <h2>Parent-Child Communication</h2>
      <p>Counter: {count}</p>
      <Child increment={increment} />
    </div>
  );
}

// Explanation:

// Issue:
// - Clicking the button does not increment the counter in Parent.
// - increment() function is not being passed to the Child component.
// - increment() function can cause stale state

// Solution:
// - Pass the increment function reference as a prop to the Child component.
// - Update the increment() function to use the setCount() function with previous value to prevent stale state.
