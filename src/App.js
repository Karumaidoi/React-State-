import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

export default function App() {
  return (
    <div className="App">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌳 Far Away</h1>;
}

function Form() {
  const [description, setDescription] = useState("");
  const [selection, setSelection] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, selection, packed: false, id: Date.now() };
    console.log(newItem);

    initialItems.push(newItem);

    //
    setDescription("");
    setSelection(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        onChange={(e) => setSelection(Number(e.target.value))}
        value={selection}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <ul>
      <span style={item.packed ? { "text-decoration": "line-through" } : {}}>
        {item.quantity}
        {item.description}
        <button>❌</button>
      </span>
    </ul>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in your list and you already packed X (X%)</em>
    </footer>
  );
}
