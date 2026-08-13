import { useState } from "react";
function App() {
  const [votes, setVotes] = useState({});
  const [selected, setSelected] = useState(0);

  const handleVote = (selected) => {
    if (votes[selected]) {
      setVotes({ ...votes, [selected]: votes[selected] + 1 });
    } else {
      setVotes({ ...votes, [selected]: 1 });
    }
    console.log(votes);
  };

  const handleClick = () => {
    const rand = Math.floor(Math.random() * (anecdotes.length - 1));
    console.log(rand);
    setSelected(rand);
  };

  const findMax = () => {
    const maxKey = Object.keys(votes).reduce((a, b) =>
      votes[a] > votes[b] ? a : b,
    );
    return maxKey;
  };
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} votes</p>
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={() => handleVote(selected)}>vote</button>
      <h1>Anecdote with most votes</h1>
      {Object.keys(votes).length === 0 ? (
        <p>Nothing to show yet </p>
      ) : (
        <div>
          <p>{anecdotes[findMax()]}</p>
          <p>has {votes[findMax()]} votes</p>
        </div>
      )}
    </>
  );
}

export default App;
