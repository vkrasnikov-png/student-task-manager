import { useState } from "react";

export default function GameForm({ onAddGame }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle || !cleanDescription) {
      setError("Заповніть назву й опис гри.");
      return;
    }

    onAddGame({ title: cleanTitle, description: cleanDescription });
    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3>Додати гру</h3>
      <p>
        <label htmlFor="game-title">Назва гри</label>{" "}
        <input
          id="game-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </p>
      <p>
        <label htmlFor="game-description">Опис гри</label>{" "}
        <textarea
          id="game-description"
          rows={3}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />
      </p>
      {error && <p role="alert">{error}</p>}
      <button type="submit">Додати гру</button>
    </form>
  );
}