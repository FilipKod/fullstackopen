import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPersonHandler = (event) => {
    event.preventDefault();

    console.log(newName);

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook.`);
      return;
    }

    const personObj = {
      name: newName,
    };
    setPersons(persons.concat(personObj));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPersonHandler}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => (
          <li key={person.name + index}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;
