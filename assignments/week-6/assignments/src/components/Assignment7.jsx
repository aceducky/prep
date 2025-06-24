import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";

// Create a component that tracks and displays the number of times it has been rendered. Use useRef to create a variable that persists across renders without causing additional renders when it changes.

export function Assignment7() {
  const [, forceRender] = useState(0);
  const rerenderRef = useRef(1);
  rerenderRef.current++;
  const handleReRender = useCallback(() => {
    // Update state to force re-render
    forceRender(Math.random());
  });

  return (
    <div>
      <p>This component has rendered {rerenderRef.current} times.</p>
      <button className="bg-blue-500 p-2 text-white" onClick={handleReRender}>
        Force Re-render
      </button>
    </div>
  );
}
