import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { getAll, create, updateNumber } from "./axios";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const personsToShow =
    search === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(search.toLowerCase()),
        );

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isExists = persons.find(
      ({ name }) => name.toLowerCase() === newName.toLowerCase(),
    );
    if (isExists) {
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old  number with a new one?`,
        )
      ) {
        const changedPerson = { ...isExists, number };
        updateNumber(isExists._id, changedPerson)
          .then((returnedPerson) => {
            //doesnt show when changing until refresh
            setPersons(
              persons.map((p) => (p._id !== isExists._id ? p : returnedPerson)),
            );
            //reset inputs
            setNewName("");
            setNumber("");
            //show notification
            setMessage(`Updated ${newName} to ${number}`);
            setMessageType("success");
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          })
          .catch((err) => {
            console.log(err);
            setMessage(err.response.data.error);
            setMessageType("error");
            setTimeout(() => {
              setMessage(null);
              setMessageType(null);
            }, 5000);
          });
      }
    } else {
      create({ name: newName, number })
        .then((returnedPerson) => {
          (setPersons(persons.concat(returnedPerson)), setNewName(""));
          setNumber("");
          setMessage(`Added ${newName}`);
          setMessageType("success");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.response.data.error);
          setMessageType("error");
          setTimeout(() => {
            setMessage(null);
            setMessageType(null);
          }, 5000);
        });
    }
  };

  useEffect(() => {
    getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((err) => {
        console.log(err);
        setMessage(`Error while fetching persons`);
        setMessageType("error");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={personsToShow}
        setPersons={setPersons}
        message={message}
        setMessage={setMessage}
        setMessageType={setMessageType}
      />
    </div>
  );
}

export default App;
