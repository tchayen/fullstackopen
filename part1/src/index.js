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

const Total = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.map((part) => part.exercises).reduce((a, b) => a + b)}
  </p>
);

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
