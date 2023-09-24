import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const ref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let newPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let char = "~!@#$%^&*(){}[]";
    if (number) str += num;
    if (character) str += char;

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length) + 1;
      newPassword += str.charAt(index);
    }
    setPassword(newPassword);
  }, [length, number, character]);

  const copyText = useCallback(() => {
    ref.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character]);

  return (
    <div className="main">
      <div className="wrapper">
        <h1>Password Generator</h1>
        <div className="password_input">
          <input type="text" value={password} ref={ref} readOnly />
          <button onClick={copyText}>copy</button>
        </div>
        <div className="options">
          <div>
            <input
              type="range"
              min={6}
              max={50}
              defaultValue={length}
              onChange={e => setLength(e.target.value)}
            />
            <label>Length: 8</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={() => setNumber(!number)}
            />
            <label>Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={character}
              onChange={() => setCharacter(!character)}
            />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
