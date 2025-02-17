import React, { useState } from "react";
import api from "../utils/api";

const AddMovieForm = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    duration: "",
    language: "",
  });

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/movies", movieData);
      alert("Movie added successfully!");
      setMovieData({ title: "", genre: "", duration: "", language: "" }); // Reset form
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
    >
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={movieData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="genre">Genre:</label>
      <input
        type="text"
        id="genre"
        name="genre"
        value={movieData.genre}
        onChange={handleChange}
        required
      />

      <label htmlFor="duration">Duration (minutes):</label>
      <input
        type="number"
        id="duration"
        name="duration"
        value={movieData.duration}
        onChange={handleChange}
        required
      />

      <label htmlFor="language">Language:</label>
      <input
        type="text"
        id="language"
        name="language"
        value={movieData.language}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
