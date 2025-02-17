

import React, { useState } from "react";
import api from "../utils/api";

const SHOWTIMES = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

const AddMovieForm = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    genre: "",
    duration: "",
    language: "",
    showtimes: [], // New state to store showtimes
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "showtimes") {
      const options = Array.from(e.target.selectedOptions, (option) => option.value);
      setMovieData({ ...movieData, [name]: options });
    } else {
      setMovieData({ ...movieData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post("/movies/", movieData, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      });
      alert("Movie added successfully!");
      setMovieData({
        title: "",
        genre: "",
        duration: "",
        language: "",
        showtimes: [],
      }); // Reset form
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

      <label htmlFor="showtimes">Select Showtimes:</label>
      <select
        id="showtimes"
        name="showtimes"
        value={movieData.showtimes}
        onChange={handleChange}
        multiple
        required
        style={{ marginBottom: "10px" }}
      >
        {SHOWTIMES.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>

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

