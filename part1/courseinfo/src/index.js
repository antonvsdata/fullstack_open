import React from "react";
import ReactDOM from "react-dom";

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
  const part_ps = props.parts.map((el) => {
    return <Part part={el} />;
  });
  return part_ps;
};

const Total = (props) => {
  const total_exercises = props.parts.reduce(
    (total, current) => total + current.exercises,
    0
  );
  return <p>Number of exercises {total_exercises}</p>;
};

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
      <Header title={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
