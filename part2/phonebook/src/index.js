import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [filter, setFilter] = useState("");
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

  const onFilterChange = (event) => {
    setFilter(event.target.value);
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
      <div>
        filter shown with <input onChange={onFilterChange} />
      </div>
      <h2>Add a new number</h2>
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
      {persons
        .filter((person) => person.name.toLocaleLowerCase().match(filter || ""))
        .map((person, index) => (
          <p key={`${person.name}-${index}`}>
            {person.name} {person.phone}
          </p>
        ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
