import React, { useState, useCallback, memo } from "react";

// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

export function Assignment4() {
  const [inputText, setInputText] = useState("");

  // Your code starts here
  const showAlert = useCallback((text) => {
    alert(text);
  }, []);

  return (
    <div className="m-4">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter some text"
        className="border p-2 rounded"
      />
      <Alert showAlert={showAlert} inputText={inputText} />
    </div>
  );
}

const Alert = memo(function Alert({ showAlert, inputText }) {
  return (
    <button
      className="border block p-2 m-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => showAlert(inputText)}
    >
      Show Alert
    </button>
  );
});
