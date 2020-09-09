import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "+358100200300" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const id = persons.findIndex((person) => person.name === newName);
    if (id !== -1) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, phone: newNumber }]);
    setNewName("");
    setNewNumber("");
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          <div>
            name: <input onChange={onNameChange} value={newName} />
          </div>
          <div>
            number: <input onChange={onNumberChange} value={newNumber} />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={`${person.name}-${index}`}>
          {person.name} {person.phone}
        </p>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
