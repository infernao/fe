import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "200px",
      }}
    >
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>Duration: {movie.duration} minutes</p>
      <Link
        to={`/movies/${movie._id}`}
        style={{ textDecoration: "none", color: "blue" }}
      >
        View Details
      </Link>
    </div>
  );
};

export default MovieCard;
