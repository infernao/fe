import React from "react";
import { Link } from "react-router-dom";
import "../CardBackground.css";

const TheaterCard = ({ theater }) => {
  return (
    <div className="card"
    // style={{
    //   border: "1px solid #ccc",
    //   padding: "10px",
    //   margin: "10px",
    //   width: "200px",
    // }}
    >
      <h3>{theater.name}</h3>
      <p>Location: {theater.location}</p>
      <Link
        to={`/movies/chotu`}
        style={{ textDecoration: "none", color: "blue" }}
      >
        View Movies
      </Link>
    </div>
  );
};

export default TheaterCard;
