import React, { useState, useEffect } from "react";
import axios from "axios";
import AvailableMovieCard from "../components/AvailableMovieCard";
import { Link } from "react-router-dom";

const AvailableMovie = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRandomMovies = async () => {
            try {
                const response = await axios.get("https://movie-booking-bxks.onrender.com/api/movies/chotu");
                console.log("API Response:", response.data);  // Logs the API response here
                setMovies(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError("Failed to fetch random movies.");
            } finally {
                setLoading(false);
            }
        };

        fetchRandomMovies();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Available Movies</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <AvailableMovieCard key={movie._id} movie={movie} />
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>

            <div className="mt-4 text-center">
                <Link to="/" className="text-blue-500 underline">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default AvailableMovie;


