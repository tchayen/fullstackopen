import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const weightedSum = good * 1 + neutral * 0 + bad * -1;
  const totalCount = good + neutral + bad;
  const average = weightedSum / totalCount;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>Statistics</h2>
      <strong>{good}</strong> good opinions
      <br />
      <strong>{neutral}</strong> neutral opinions
      <br />
      <strong>{bad}</strong> bad opinions
      <br />
      <strong>{good + neutral + bad}</strong> opinions in total
      <br />
      <strong>{(average || 0).toFixed(2)}</strong> on average
      <br />
      <strong>{((good / totalCount) * 100 || 0).toFixed(2)}%</strong> were
      positive
      <br />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
