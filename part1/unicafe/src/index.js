import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h2>Statistics</h2>
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
      <br />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
