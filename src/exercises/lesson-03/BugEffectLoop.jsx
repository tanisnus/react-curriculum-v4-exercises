//src/exercises/lesson-03/BugEffectLoop.jsx

/* 
  BUG #1 — Effect Issue 

  This component uses useState and useEffect to update a value.
  The effect is running on every render, which causes the
  component to behave incorrectly.
  */

import { useEffect, useState } from 'react';

export default function BugEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount((prev) => prev + 1);
  }, []);

  return <p>Bug 1 Count: {count}</p>;
}

// Explanation:
// (Write your explanation here)

// Issue: The useEffect is missing the dependency array, so it will run on every render.
// Solution: Added useEffect's empty dependency array

// Issue: Setter setCount is not updating the count variable correctly because it is using stale value
// Solution: Added functional updating to update the most recent value of the count variable correctly.
