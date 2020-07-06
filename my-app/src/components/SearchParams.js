import React, { useState, useEffect } from "react";
import axios from "axios";
import Questions from "./Question";

function SearchParams() {
  const [person, setPerson] = useState("Luke Skywalker");
  const [people, setPeople] = useState([]);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people")
      .then((res) => {
        console.log("test 0", res.data.results);
        setPeople(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setAnswer("");

    axios.get("https://swapi.dev/api/people").then((res) => {
      console.log("test", res.data.results);
      const matchPerson = res.data.results.filter((crrV) => {
        return crrV.name === person;
      });
      console.log("selected character", matchPerson);
    }, console.err);
  }, [person]);

  return (
    <div>
      <form>
        <label htmlFor="person">Character</label>
        <br />
        <select
          id="person"
          value={person}
          onChange={(e) => setPerson(e.target.value)}
          onBlur={(e) => setPerson(e.target.value)}
        >
          {people.map((string) => {
            return (
              <option key={string.name} value={string.name}>
                {string.name}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <br />
        <label htmlFor="info">What do you want to know?</label>
        <br />
        <select
          id="info"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onBlur={(e) => setQuestion(e.target.value)}
          // disabled={infos.length === 0}
        >
          {Questions.map((crrV) => {
            return (
              <option key={crrV} value={crrV}>
                {crrV}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <br />
        <label htmlFor="answer">Answer</label>
        <div>
          <p>{answer}</p>
        </div>
      </form>
    </div>
  );
}

export default SearchParams;
