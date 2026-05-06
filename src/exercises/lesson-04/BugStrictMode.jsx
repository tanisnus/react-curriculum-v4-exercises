// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.

import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Assign the intervalID to a variable to be used in the cleanup function
    const intervalID = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    // cleanup function to clear the interval
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div>
      <h2>StrictMode Timer Bug</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// Write your explanation of how StrictMode helps us catch this bug

// Explanation:
// StrictMode intentionally double-invokes effects to help us catch side effects that would normally go unnoticed but become problematic when a component mounts multiple times.
// In this case, the interval was initially set up on every render, which is causing the count to increment by 2 instead of 1.
// By adding the cleanup function, we are clearing the interval on unmount, which prevents the interval from being set up multiple times.
