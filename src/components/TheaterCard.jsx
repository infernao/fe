import React from "react";
import { Link } from "react-router-dom";

const TheaterCard = ({ theater }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px",
        width: "200px",
      }}
    >
      <h3>{theater.name}</h3>
      <p>Location: {theater.location}</p>
      <Link
        to={`/theaters/${theater._id}`}
        style={{ textDecoration: "none", color: "blue" }}
      >
        View Details
      </Link>
    </div>
  );
};

export default TheaterCard;
