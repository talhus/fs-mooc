import { useState } from "react";

const Header = ({ value }) => (
  <>
    <h1>{value}</h1>
  </>
);

const Button = ({ name, onClick }) => (
  <>
    <button onClick={onClick}>{name}</button>
  </>
);

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good - bad) / total;
  const positive = total === 0 ? 0 : (good / total) * 100;

  const handleClick = (name) => {
    if (name === "good") {
      setGood(good + 1);
    } else if (name === "neutral") {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };

  return (
    <>
      <Header value={"give feedback"} />
      <br />
      <Button name="good" onClick={() => handleClick("good")} />
      <Button name="neutral" onClick={() => handleClick("neutral")} />
      <Button name="bad" onClick={() => handleClick("bad")} />
      <br />

      <Header value={"statistics"} />
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive}
        />
      )}
    </>
  );
}

export default App;
