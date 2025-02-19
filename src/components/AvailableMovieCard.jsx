import React from "react";
import { Link } from "react-router-dom";
const AvailableMovieCard = ({ movie }) => {
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

            {/* Directly render showtimes string */}
            {movie.showtimes ? (
                <p>Showtimes: {movie.showtimes}</p>
            ) : (
                <p>No showtimes available</p>
            )}

            <Link to={`/movies/${movie._id}`} style={{ textDecoration: "none", color: "blue" }}>
                View Details
            </Link>
        </div>
    );
};

export default AvailableMovieCard;

