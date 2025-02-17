import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";

const SEAT_PRICES = { Standard: 15, Premium: 30 };
const SHOWTIMES = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"]; // Available showtimes

const BookMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState(""); // NEW: Showtime state
  const [seats, setSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await api.get(`/movies/${id}`);
        setMovie(movieResponse.data);

        const theatersResponse = await api.get("/theaters");
        setTheaters(theatersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log("selectedTheater", selectedTheater);
  console.log("selectedScreen", selectedScreen);
  console.log("selectedShowtime", selectedShowtime);
  useEffect(() => {
    console.log("here")
    if (selectedTheater && selectedScreen && selectedShowtime) {
      fetchBookedSeats();
    }
  }, [selectedTheater, selectedScreen, selectedShowtime]);

  useEffect(() => {
    let newTotal = seats.reduce((sum, seat) => sum + SEAT_PRICES[seat.type], 0);
    setTotalPrice(newTotal);
  }, [seats]);

  const fetchBookedSeats = async () => {
    try {
      const response = await api.get(
        `/bookings/${selectedTheater}/${selectedScreen}/${selectedShowtime}`
      );
      console.log("response", response.data);
      setBookedSeats(response.data.bookedSeats || []);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      setBookedSeats([]);
    }
  };

  const handleTheaterChange = (e) => {
    setSelectedTheater(e.target.value);
    setSelectedScreen("");
    setSelectedShowtime("");
    setBookedSeats([]);
  };

  const handleScreenChange = (e) => {
    setSelectedScreen(e.target.value);
    setSelectedShowtime("");
  };

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);
  };

  const handleSeatChange = (e) => {
    const [seatNumber, seatType] = e.target.value.split("-");
    const seat = { number: seatNumber, type: seatType };

    setSeats((prevSeats) =>
      prevSeats.some((s) => s.number === seat.number)
        ? prevSeats.filter((s) => s.number !== seat.number)
        : [...prevSeats, seat]
    );
  };

  const handleBooking = async () => {
    try {
      if (!selectedTheater || !movie || !selectedScreen || !selectedShowtime) {
        alert("Please select a theater, screen, and showtime");
        return;
      }
      if (seats.length === 0) {
        alert("Please select at least one seat");
        return;
      }

      const bookingData = {
        movieId: movie._id,
        theaterId: selectedTheater,
        screenNumber: parseInt(selectedScreen, 10),
        showtime: selectedShowtime,
        seats: seats.map((seat) => seat.number),
      };
      const response = await api.post("/bookings", bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is stored
        },
      });

      if (response.status === 201) {
        navigate("/payment");
      }
    } catch (error) {
      console.error("Error booking tickets:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return <div style={{ padding: "20px" }}>Movie not found.</div>;
  }

  const availableScreens = selectedTheater
    ? theaters.find((theater) => theater._id === selectedTheater)?.screens || []
    : [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Tickets for {movie.title}</h2>

      <label htmlFor="theater">Select Theater:</label>
      <select
        id="theater"
        value={selectedTheater}
        onChange={handleTheaterChange}
        style={{ marginBottom: "10px", padding: "5px" }}
      >
        <option value="">Select a Theater</option>
        {theaters.map((theater) => (
          <option key={theater._id} value={theater._id}>
            {theater.name}
          </option>
        ))}
      </select>

      {selectedTheater && (
        <>
          <label htmlFor="screen">Select Screen:</label>
          <select
            id="screen"
            value={selectedScreen}
            onChange={handleScreenChange}
            style={{ marginBottom: "10px", padding: "5px" }}
          >
            <option value="">Select a Screen</option>
            {availableScreens.map((screen) => (
              <option key={screen.screenNumber} value={screen.screenNumber}>
                Screen {screen.screenNumber}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedTheater && selectedScreen && (
        <>
          <label htmlFor="showtime">Select Showtime:</label>
          <select
            id="showtime"
            value={selectedShowtime}
            onChange={handleShowtimeChange}
            style={{ marginBottom: "10px", padding: "5px" }}
          >
            <option value="">Select a Showtime</option>
            {SHOWTIMES.map((showtime, index) => (
              <option key={index} value={showtime}>
                {showtime}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedTheater && selectedScreen && selectedShowtime && (
        <>
          <h3>Select Seats:</h3>
          {[...Array(10)].map((_, i) => {
            const seatNumber = `Seat${i + 1}`;
            const isBooked = bookedSeats.includes(seatNumber);
            console.log("isBooked", isBooked);
            console.log("bookedSeats", bookedSeats);

            return (
              <label key={i} style={{ marginRight: "10px", opacity: isBooked ? 0.5 : 1 }}>
                {seatNumber} (Standard)
                <input
                  type="checkbox"
                  value={`${seatNumber}-Standard`}
                  onChange={handleSeatChange}
                  disabled={isBooked}
                />
              </label>
            );
          })}
          {[...Array(5)].map((_, i) => {
            const seatNumber = `Seat${i + 11}`;
            const isBooked = bookedSeats.includes(seatNumber);

            return (
              <label key={i + 10} style={{ marginRight: "10px", color: "gold", opacity: isBooked ? 0.5 : 1 }}>
                {seatNumber} (Premium)
                <input
                  type="checkbox"
                  value={`${seatNumber}-Premium`}
                  onChange={handleSeatChange}
                  disabled={isBooked}
                />
              </label>
            );
          })}
        </>
      )}

      {seats.length > 0 && (
        <>
          <h3>Total Price: ${totalPrice}</h3>
          <button
            onClick={handleBooking}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Book Now
          </button>
        </>
      )}
    </div>
  );
};

export default BookMovie;




