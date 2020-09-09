import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const sortedByVotes = Object.entries(votes)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => Number(id));

  console.log(sortedByVotes);

  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>
        <strong>{votes[selected] || 0}</strong> votes
      </p>
      <button
        onClick={() =>
          setVotes({ ...votes, [selected]: (votes[selected] || 0) + 1 })
        }
      >
        Vote
      </button>
      <button
        onClick={() =>
          setSelected(Math.floor(Math.random() * anecdotes.length))
        }
      >
        Next anecdote
      </button>
      {sortedByVotes.length > 0 && (
        <>
          <h2>Anecdote with most votes</h2>
          <p>
            {props.anecdotes[sortedByVotes[0]]}
            <br />
            has <strong>{votes[sortedByVotes[0]]}</strong> votes
          </p>
        </>
      )}
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
