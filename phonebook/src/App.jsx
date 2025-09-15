import { useState } from "react";

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
      <div>
        filter by name <input value={filterInput} onChange={filerInputChange} />
      </div>
      <h2>add new</h2>
      <form onSubmit={addPersonHandler}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleNewNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsList.map((person) => (
          <li key={person.id}>
            {person.name} - {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
