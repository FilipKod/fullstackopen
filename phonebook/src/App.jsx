import { useState } from "react";
import Persons from "./components/Persons";
import FilterInput from "./components/FilterInput";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0923432432", id: 1 },
    { name: "Filip Madunicky", number: "0987655443", id: 2 },
    { name: "Kamado Tanjiro", number: "0908764445", id: 3 },
    { name: "Monkey D. Luffy", number: "0912356345", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPersonHandler = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`Name ${newName} is already added to phonebook.`);
      return;
    }

    if (persons.some((person) => person.number === newNumber)) {
      alert(`Number ${newNumber} is already added to phonebook.`);
      return;
    }

    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };

  const filerInputChange = (event) => {
    setFilterInput(event.target.value);
  };

  const personsList = filterInput
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterInput.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={personsList} />
    </div>
  );
};
export default App;
