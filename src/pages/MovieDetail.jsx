import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return <div style={{ padding: "20px" }}>Movie not found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{movie.title}</h2>
      <p>Genre: {movie.genre}</p>
      <p>Duration: {movie.duration} minutes</p>
      <p>Language: {movie.language}</p>


      <h3>Showtimes</h3>
      {movie.showtimes && movie.showtimes.length > 0 ? (
        <ul>
          {movie.showtimes.map((time, index) => (
            <li key={index}>{time}</li>
          ))}
        </ul>
      ) : (
        <p>All showtimes available</p>
      )}

      <Link
        to={`/book-movie/${id}`}
        style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#007bff",
          padding: "10px",
          borderRadius: "5px",
          display: "inline-block",
        }}
      >
        Book Tickets
      </Link>
    </div>
  );
};

export default MovieDetail;

