import React, { useState } from "react";
import ReactDOM from "react-dom";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Display = ({ selected, anecdotes, votes }) => {
  return (
    <>
      <p>{anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes</p>
    </>
  );
};

// found online
const argMax = (array) => {
  return [].map
    .call(array, (x, i) => [x, i])
    .reduce((r, a) => (a[0] > r[0] ? a : r))[1];
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const chooseRandom = () =>
    setSelected(Math.floor(Math.random() * anecdotes.length));

  const voteCurrent = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display selected={selected} anecdotes={anecdotes} votes={votes} />
      <Button text="next anecdote" handleClick={chooseRandom} />
      <Button text="vote" handleClick={voteCurrent} />
      <Header text="Anecdote with most votes" />
      <Display selected={argMax(votes)} anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
