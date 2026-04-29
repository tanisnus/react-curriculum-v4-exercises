// TOPIC: Correct useRef usage to control DOM elements
// TASK: Implement focusing an input field when the button is clicked.

import { useRef } from 'react';
export default function FillRefFocus() {
  const inputRef = useRef(null);
  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <h2>useRef: Focusing an Input</h2>

      <input type="text" placeholder="Type here..." ref={inputRef} />

      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

// Explanation:
// Issue: The input field is not focused when the button is clicked.
// Solution:
// - Create a ref object and pass it as a prop to the input field's ref attribute.
// - Define the focusInput function by calling the focus() method on the DOM node referenced by the ref object.
