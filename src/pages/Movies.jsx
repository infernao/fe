import React, { useState, useEffect } from "react";
import api from "../utils/api";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Movies</h2>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
