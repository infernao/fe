import React from "react";
import { Link } from "react-router-dom";
import "../CardBackground.css"
const MovieCard = ({ movie }) => {
  return (
    <div className="card"
    // style={{
    //   border: "1px solid #ccc",
    //   padding: "10px",
    //   margin: "10px",
    //   width: "200px",
    // }}
    >
      <h3>{movie.title}</h3>
      <p>Genre: {movie.genre}</p>
      <p>Duration: {movie.duration} minutes</p>

      {/* Show showtimes if available, otherwise display a message */}
      {movie.showtimes && movie.showtimes.length > 0 ? (
        <div>
          <h4>Showtimes:</h4>
          <ul>
            {movie.showtimes.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>All showtimes available</p>
      )}

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

