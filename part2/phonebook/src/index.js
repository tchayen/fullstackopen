import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const id = persons.findIndex((person) => person.name === newName);
    if (id !== -1) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    setPersons([...persons, { name: newName }]);
    setNewName("");
  };

  const onChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={onChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <p key={`${person.name}-${index}`}>{person.name}</p>
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
