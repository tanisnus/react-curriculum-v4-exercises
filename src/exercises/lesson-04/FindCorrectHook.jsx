// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useRef } from 'react';
export default function FindCorrectHook() {
  const clickCountRef = useRef(0);

  function handleClick(event) {
    clickCountRef.current++;
    event.target.textContent = `${clickCountRef.current} Clicks`;
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button onClick={handleClick}> Clicks</button>
    </div>
  );
}

// Explanation:

// Issue: The click count is not updating correctly.
// Solution: using useRef because making updates does not trigger a re-render.
// useRef is used to store a mutable value, which is the click count in this case.
// useRef does not cause a re-render when the value changes.
// Accessing and updating the current value of the ref with .current
