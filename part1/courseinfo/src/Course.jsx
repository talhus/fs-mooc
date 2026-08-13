//part
const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

//header
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

//content
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((singlePart) => {
        return (
          <Part
            key={singlePart.id}
            name={singlePart.name}
            exercises={singlePart.exercises}
          />
        );
      })}
    </div>
  );
};

//total
const Total = ({ parts }) => {
  const initialValue = 0;
  const totalExercises = parts.map((part) => part.exercises);
  return (
    <p>
      <b>
        Number of exercises{" "}
        {totalExercises.reduce((a, b) => a + b, initialValue)}
      </b>
    </p>
  );
};

function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;
