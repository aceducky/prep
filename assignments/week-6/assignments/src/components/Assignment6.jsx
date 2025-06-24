import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment6() {
  const focusRef = useRef(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  const handleButtonClick = () => {
    focusRef.current?.focus();
  };

  return (
    <div>
      <input ref={focusRef} type="text" placeholder="Enter text here" />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
