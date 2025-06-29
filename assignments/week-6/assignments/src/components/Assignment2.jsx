import React, { useState } from "react";
import { useMemo } from "react";

// In this assignment, you will create a component that renders a large list of sentences and includes an input field for filtering these items.
// The goal is to use useMemo to optimize the filtering process, ensuring the list is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value in the dependency array

const words = ["hi", "my", "name", "is", "for", "to", "random", "word"];
const TOTAL_LINES = 1000;
const ALL_WORDS = [];
for (let i = 0; i < TOTAL_LINES; i++) {
  let sentence = "";
  for (let j = 0; j < words.length; j++) {
    sentence += words[Math.floor(words.length * Math.random())];
    sentence += " ";
  }
  ALL_WORDS.push(sentence);
}

export function Assignment2() {
  const [sentences, setSentences] = useState(ALL_WORDS);
  const [filter, setFilter] = useState("");

  const filteredSentences = useMemo(
    () => sentences.filter((x) => x.includes(filter)),
    [filter, sentences]
  );
  const [count, setCount] = useState(1);
  return (
    <div className="grid place-items-center my-5">
      <p>Seperate calculation: {count}</p>
      <button
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setCount(count + 1)}
      >
        Increment Counter
      </button>

      <input
        type="text"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
        className="border p-2 mt-5"
      ></input>
      {filteredSentences.map((word, i) => (
        <div key={i}>{word}</div>
      ))}
    </div>
  );
}
