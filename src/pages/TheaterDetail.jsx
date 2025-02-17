import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

const TheaterDetail = () => {
  const { id } = useParams();
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheater = async () => {
      try {
        const response = await api.get(`/theaters/${id}`);
        setTheater(response.data);
      } catch (error) {
        console.error("Error fetching theater:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheater();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!theater) {
    return <div style={{ padding: "20px" }}>Theater not found.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{theater.name}</h2>
      <p>Location: {theater.location}</p>
      <h3>Screens</h3>
      {theater.screens && theater.screens.length > 0 ? (
        <ul>
          {theater.screens.map((screen) => (
            <li key={screen.screenNumber}>
              Screen Number: {screen.screenNumber}, Total Seats:{" "}
              {screen.totalSeats}, Seat Layout: {screen.seatLayout}
            </li>
          ))}
        </ul>
      ) : (
        <p>No screens available.</p>
      )}
    </div>
  );
};

export default TheaterDetail;
