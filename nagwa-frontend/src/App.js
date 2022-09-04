import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const options = ["noun", "verb", "adverb", "adjective"];
function App() {
  const [wordList, setWordsList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [rank, setRank] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();

    if (count < 9) {
      if (wordList[count].pos === checked) {
        setScore((prev) => prev + 1);
      }
      setCount((prev) => prev + 1);
    } else {
      axios
        .post("http://localhost:8080/rank", { score: (score / 10) * 100 })
        .then((res) => {
          setRank(res.data.message);
          setCount(0);
          setScore(0);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCheck = (event) => {
    setChecked(event.target.value);
  };

  const fetchWords = () => {
    axios
      .get("http://localhost:8080/words")
      .then((data) => {
        setWordsList(data.data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const tryAgain = () => {
    setCount(0);
    setScore(0);
    fetchWords();
    setRank(null);
  };

  useEffect(() => {
    fetchWords();
  }, []);
  return (
    <div className="App">
      <main>
        {/* <h1>{qs.word}</h1> */}
        <h2 style={{ color: "#fff" }}>{count + 1} Question from 10</h2>
        <h1>{wordList[count]?.word}</h1>
        <form onSubmit={onSubmit}>
          <div className="inputs">
            {options.map((option) => (
              <div className="input-wrapper" key={option}>
                <input
                  type="radio"
                  value={option}
                  name={"words"}
                  id={option}
                  onChange={handleCheck}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <input type="submit" value="Submit" />
        </form>
        {rank ? (
          <>
            <h2 style={{ color: "#fff" }}>{rank}</h2>
            <button onClick={tryAgain}>Try Again</button>
          </>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
