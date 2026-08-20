import { deletePerson } from "../axios";
const Numbers = ({
  persons,
  setPersons,
  message,
  setMessage,
  setMessageType,
}) => {
  const handleDelete = (id) => {
    const person = persons.find((p) => p._id === id);
    const con = confirm(`Delete ${person.name}`);
    if (con) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p._id !== id));
        })
        .catch((err) => {
          console.log(err);
          if (err?.response?.status === 404) {
            setMessage(
              `Information of ${person.name} has already been removed from server`,
            );
          } else {
            setMessage(`Error while deleting ${person.name}`);
          }
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
    }
  };
  return (
    <div>
      {persons.map((person) => (
        <p key={person._id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person._id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Numbers;
