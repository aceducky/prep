import { useState, useCallback } from "react";

// Create a counter component with increment and decrement functions.
// Pass these functions to a child component which has buttons to perform
// the increment and decrement actions. Use useCallback to ensure that
// these functions are not recreated on every render.

export function Assignment5() {
  const [count, setCount] = useState(0);

  // Your code starts here
  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);
  // Your code ends here

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

const CounterButtons = ({ onIncrement, onDecrement }) => (
  <div>
    <button
      className="bg-blue-500 p-2 m-2 text-white rounded cursor-pointer"
      onClick={onIncrement}
    >
      Increment
    </button>
    <button
      className="bg-blue-500 p-2 m-2 text-white rounded cursor-pointer"
      onClick={onDecrement}
    >
      Decrement
    </button>
  </div>
);
