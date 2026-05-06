// src/exercises/lesson-03/BugMutatedState.jsx

/*
  BUG #2 — State Issue

  This component displays a count and updates it when the button is clicked.
  However, the way the count is being changed causes the component to behave
  incorrectly.
*/

import { useState } from 'react';
export default function BugMutatedState() {
  let [count, setCount] = useState(0);

  function handleAdd() {
    // count++;
    // setCount(count);
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <div>
      <p>Bug 2 Count: {count}</p>
      <button onClick={handleAdd}>Add 1</button>
    </div>
  );
}

// Explanation:
// (Write your explanation here)
// Issue: The count variable is being mutated directly without using the setter function. It is mutating the value with 'count++' which is not the correct way to update the value.
// Solution: Added functional updating to update the most recent value of the count variable correctly.
