import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const Header = ({ course }) => <h1>{course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part.name} numberOfExercises={part.exercises} />
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

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Test",
        exercises: 200,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
