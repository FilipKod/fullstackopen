import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import FilterInput from "./components/FilterInput";
import Form from "./components/Form";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [notifyMessage, setNotifyMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialState) => setPersons(initialState));
  }, []);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const showUpdateCreateMessage = (name) => {
    setNotifyMessage(`a person [${name}] is added or a number is changed`);
    setTimeout(() => setNotifyMessage(null), 5000);
  };

  const addPersonHandler = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const updatedConfirmed = confirm(
        `${newName} is already added to phonebook, replace the old number with a new one.`
      );
      if (updatedConfirmed) {
        const person = persons.find((person) => person.name === newName);
        personService
          .updateNumber(person.id, { ...person, number: newNumber })
          .then((updatedData) => {
            setPersons(
              persons.map((el) => (el.id === person.id ? updatedData : el))
            );
            showUpdateCreateMessage(updatedData.name);
            setNewName("");
            setNewNumber("");
          });
      }
      return;
    }

    if (persons.some((person) => person.number === newNumber)) {
      alert(`Number ${newNumber} is already added to phonebook.`);
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObj).then((person) => {
      setPersons(persons.concat(person));
      showUpdateCreateMessage(person.name);
      setNewName("");
      setNewNumber("");
    });
  };

  const filerInputChange = (event) => {
    setFilterInput(event.target.value);
  };

  const personsList = filterInput
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    : persons;

  const deletePersonHandler = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);
    const confirmed = confirm(`Delete ${deletedPerson.name} ?`);

    if (confirmed) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} />
      <FilterInput value={filterInput} onChange={filerInputChange} />
      <h2>add new</h2>
      <Form
        onSubmit={addPersonHandler}
        nameValue={newName}
        numberValue={newNumber}
        onChangeName={handleNewNameChange}
        onChangeNumber={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsList} onDelete={deletePersonHandler} />
    </div>
  );
};
export default App;
