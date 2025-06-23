import { useEffect, useState } from "react";

const Link = ({ text, url }) => {
  return (
    <a
      href={url}
      className="inline-block w-fit bg-blue-500 text-white p-3 my-2 mr-2 rounded-sm"
    >
      {text}
    </a>
  );
};

function Card({ name, desc, interests, socialHandles }) {
  return (
    <div className="shadow-md border border-gray-200 p-4 max-w-[400px] m-2 rounded-sm">
      <h1 className="text-2xl font-bold my-2">{name}</h1>
      <p className="text-gray-600">{desc}</p>
      {interests.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold my-1">Interests</h2>
          {interests.map((interest, i) => (
            <p key={i} className="text-gray-600">
              {interest}
            </p>
          ))}
        </div>
      )}
      {socialHandles.length > 0 && (
        <>
          {socialHandles.map((socialHandle, i) => (
            <Link key={i} text={socialHandle.text} url={socialHandle.url} />
          ))}
        </>
      )}
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [interests, setInterests] = useState([]);
  const [socialHandles, setSocialHandles] = useState([]);
  useEffect(() => {
    setName("Abcd");
    setDesc("This is desc");
    setInterests(["first interest", "second interest"]);
    setSocialHandles([
      { text: "Linkedin", url: "linkedin.com" },
      { text: "Twitter", url: "x.com" },
    ]);
  }, []);
  return (
    <>
      <Card
        name={name}
        desc={desc}
        interests={interests}
        socialHandles={socialHandles}
      />
    </>
  );
}

export default App;
