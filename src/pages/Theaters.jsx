import React, { useState, useEffect } from "react";
import api from "../utils/api";
import TheaterCard from "../components/TheaterCard";
import Loading from "../components/Loading";

const Theaters = () => {
  const [theaters, setTheaters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await api.get("/theaters");
        setTheaters(response.data);
      } catch (error) {
        console.error("Error fetching theaters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTheaters = theaters.filter(
    (theater) =>
      theater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      theater.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Theaters</h2>
      <input
        type="text"
        placeholder="Search theaters..."
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px", width: "300px" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredTheaters.map((theater) => (
          <TheaterCard key={theater._id} theater={theater} />
        ))}
      </div>
    </div>
  );
};

export default Theaters;
