import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>
      <strong>{value}</strong>
    </td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const totalCount = good + neutral + bad;

  if (totalCount === 0) {
    return (
      <div>
        <h2>Statistics</h2>No feedback given.
      </div>
    );
  }

  const weightedSum = good * 1 + neutral * 0 + bad * -1;
  const average = weightedSum / totalCount;

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic value={good} text="good" />
          <Statistic value={neutral} text="neutral" />
          <Statistic value={bad} text="bad" />
          <Statistic value={totalCount} text="all" />
          <Statistic value={average.toFixed(2)} text="average" />
          <Statistic
            value={`${((good / totalCount) * 100).toFixed(2)}%`}
            text="positive"
          />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ title, onClick }) => (
  <button onClick={onClick}>{title}</button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button title="Good" onClick={() => setGood(good + 1)} />
      <Button title="Neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button title="Bad" onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
