import { useState } from "react";

function expensiveComputation(input) {
  console.log(`Computing expensive value for input: ${input}`);
  let result = input;
  for (let i = 0; i < 1000000; i++) {
    result = Math.sqrt(result + i) * 0.9999;
  }
  return result;
}

export function Assignment1() {
  const [count, setCount] = useState(1);
  const [input, setInput] = useState(1);

  const expensiveValue = expensiveComputation(input);

  return (
    <div className="m-4 space-y-4">
      <input
        type="number"
        className="border rounded p-2"
        min={1}
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
      />

      <p className="font-mono text-lg">
        Expensive value: {expensiveValue.toFixed(6)}
      </p>

      <p>Seperate calculation: {count}</p>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setCount(count + 1)}
      >
        Increment Counter
      </button>
    </div>
  );
}
