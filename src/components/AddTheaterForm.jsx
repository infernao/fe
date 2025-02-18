import React, { useState } from "react";
import api from "../utils/api";

const AddTheaterForm = () => {
  const [theaterData, setTheaterData] = useState({
    name: "",
    location: "",
    screens: [
      {
        screenNumber: 1,
        totalSeats: 50,
        seatLayout: "Standard",
        seatPrices: { Standard: 10, Premium: 20 }
      }
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const screenMatch = name.match(/^screens\[(\d+)\]\.(.+)$/);

    if (screenMatch) {
      const index = parseInt(screenMatch[1], 10);
      const field = screenMatch[2];
      const updatedScreens = [...theaterData.screens];

      if (field.startsWith("seatPrices.")) {
        const priceType = field.split(".")[1];
        updatedScreens[index].seatPrices[priceType] = parseFloat(value) || 0;
      } else {
        updatedScreens[index][field] = field === "screenNumber" || field === "totalSeats"
          ? parseInt(value, 10) || 0
          : value;
      }

      setTheaterData({ ...theaterData, screens: updatedScreens });
    } else {
      setTheaterData({ ...theaterData, [name]: value });
    }
  };

  const addScreen = () => {
    setTheaterData({
      ...theaterData,
      screens: [
        ...theaterData.screens,
        {
          screenNumber: theaterData.screens.length + 1,
          totalSeats: 50,
          seatLayout: "Standard",
          seatPrices: { Standard: 10, Premium: 20 } // Default Prices
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/theaters", theaterData);
      alert("Theater added successfully!");
      setTheaterData({
        name: "",
        location: "",
        screens: [
          {
            screenNumber: 1,
            totalSeats: 50,
            seatLayout: "Standard",
            seatPrices: { Standard: 10, Premium: 20 }
          }
        ],
      }); // Reset form
    } catch (error) {
      console.error("Error adding theater:", error);
      alert("Failed to add theater.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", maxWidth: "400px" }}
    >
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={theaterData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={theaterData.location}
        onChange={handleChange}
        required
      />

      <h3>Screens</h3>
      {theaterData.screens.map((screen, index) => (
        <div
          key={index}
          style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
        >
          <h4>Screen {index + 1}</h4>
          <label htmlFor={`screens[${index}].screenNumber`}>Screen Number:</label>
          <input
            type="number"
            id={`screens[${index}].screenNumber`}
            name={`screens[${index}].screenNumber`}
            value={screen.screenNumber}
            onChange={handleChange}
            required
          />

          <label htmlFor={`screens[${index}].totalSeats`}>Total Seats:</label>
          <input
            type="number"
            id={`screens[${index}].totalSeats`}
            name={`screens[${index}].totalSeats`}
            value={screen.totalSeats}
            onChange={handleChange}
            required
          />

          <label htmlFor={`screens[${index}].seatLayout`}>Seat Layout:</label>
          <input
            type="text"
            id={`screens[${index}].seatLayout`}
            name={`screens[${index}].seatLayout`}
            value={screen.seatLayout}
            onChange={handleChange}
            required
          />

          {/* Seat Prices */}
          <label htmlFor={`screens[${index}].seatPrices.Standard`}>Standard Seat Price ($):</label>
          <input
            type="number"
            id={`screens[${index}].seatPrices.Standard`}
            name={`screens[${index}].seatPrices.Standard`}
            value={screen.seatPrices.Standard}
            onChange={handleChange}
            required
          />

          <label htmlFor={`screens[${index}].seatPrices.Premium`}>Premium Seat Price ($):</label>
          <input
            type="number"
            id={`screens[${index}].seatPrices.Premium`}
            name={`screens[${index}].seatPrices.Premium`}
            value={screen.seatPrices.Premium}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addScreen}>
        Add Screen
      </button>

      <button
        type="submit"
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Add Theater
      </button>
    </form>
  );
};

export default AddTheaterForm;

