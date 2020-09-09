import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part.name} numberOfExercises={part.exercises} />
    ))}
  </div>
);

const Part = ({ part, numberOfExercises }) => (
  <p>
    {part} {numberOfExercises}
  </p>
);

const Total = ({ numberOfExercises }) => (
  <p>Number of exercises {numberOfExercises}</p>
);

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const parts = [part1, part2, part3];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total
        numberOfExercises={parts
          .map((part) => part.exercises)
          .reduce((a, b) => a + b)}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
