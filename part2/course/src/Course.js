import React from "react";

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
    <strong>
      Number of exercises{" "}
      {parts.map((part) => part.exercises).reduce((a, b) => a + b)}
    </strong>
  </p>
);

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
