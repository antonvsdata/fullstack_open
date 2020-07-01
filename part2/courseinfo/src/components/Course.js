import React from "react";

const Header = (props) => {
  return <h1>{props.title}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  const part_ps = props.parts.map((part) => {
    return <Part key={part.id} part={part} />;
  });
  return part_ps;
};

const Total = (props) => {
  const total_exercises = props.parts.reduce(
    (total, current) => total + current.exercises,
    0
  );
  return <strong>total of {total_exercises} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
