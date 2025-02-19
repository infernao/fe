import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ManageMovies = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await api.get("/movies");
            setMovies(response.data);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleDeleteMovie = async (id) => {
        if (!window.confirm("Are you sure you want to delete this movie?")) return;

        try {
            await api.delete(`/movies/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setMovies(movies.filter((movie) => movie._id !== id));
        } catch (error) {
            console.error("Error deleting movie:", error);
            alert("Failed to delete movie");
        }
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <h3>Manage Movies</h3>
            <ul>
                {movies.map((movie) => (
                    <li
                        key={movie._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                            padding: "10px",
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                            backgroundColor: "rgba(255, 255, 255, 0.9)", // Translucent white for contrast
                            color: "#000", // Black text for visibility
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            fontWeight: "500"
                        }}
                    >
                        <span>{movie.title}</span>
                        <button
                            onClick={() => handleDeleteMovie(movie._id)}
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "5px",
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageMovies;
