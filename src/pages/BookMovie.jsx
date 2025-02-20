 
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loading from "../components/Loading";
import "../BookingForm.css";

const SHOWTIMES = ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

const BookMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [seatLayout, setSeatLayout] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [seatPrices, setSeatPrices] = useState({ Standard: 15, Premium: 30 });
  const [seats, setSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await api.get("/movies/${id}");
        setMovie(movieResponse.data);

        const theatersResponse = await api.get("/theaters");
        setTheaters(theatersResponse.data);


        if (movieResponse.data.showtimes && movieResponse.data.showtimes.length > 0) {
          setSelectedShowtime(movieResponse.data.showtimes[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };


    fetchData();
  }, [id]);


  useEffect(() => {
    if (selectedTheater && selectedScreen) {

      const totalSeats = Math.floor(Math.random() * (80 - 40 + 1)) + 40;

      const premiumCountRaw = Math.floor(Math.random() * (35 - 20 + 1)) + 20;
      const premiumCount = Math.min(premiumCountRaw, totalSeats);
      const standardCount = totalSeats - premiumCount;


      const standardSeats = [];
      for (let i = 1; i <= standardCount; i++) {
        standardSeats.push({
          number: i.toString(),
          type: "Standard",
        });
      }


      const premiumSeats = [];
      for (let i = standardCount + 1; i <= totalSeats; i++) {
        premiumSeats.push({
          number: i.toString(),
          type: "Premium",
        });
      }

      setSeatLayout([...standardSeats, ...premiumSeats]);
    }
  }, [selectedTheater, selectedScreen]);


  useEffect(() => {
    if (selectedTheater && selectedScreen && selectedShowtime && selectedDate) {
      fetchBookedSeats();
    }
  }, [selectedTheater, selectedScreen, selectedShowtime, selectedDate]);


  useEffect(() => {
    if (selectedTheater && selectedScreen) {
      const theater = theaters.find((t) => t._id === selectedTheater);
      const screen = theater?.screens.find((s) => s.screenNumber == selectedScreen);
      if (screen) {
        setSeatPrices(screen.seatPrices || { Standard: 15, Premium: 30 });
      }
    }
  }, [selectedTheater, selectedScreen, theaters]);


  useEffect(() => {
    const newTotal = seats.reduce((sum, seat) => {
      const seatPrice = seatPrices[seat.type] || 0;
      return sum + seatPrice;
    }, 0);
    setTotalPrice(newTotal);
  }, [seats, seatPrices]);

  const fetchBookedSeats = async () => {
    try {
      const response = await api.get(
        "/bookings/${selectedTheater}/${selectedScreen}/${selectedShowtime}?date=${selectedDate}"
      );
      setBookedSeats(response.data.bookedSeats || []);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      setBookedSeats([]);
    }
  };

  const handleTheaterChange = (e) => {
    setSelectedTheater(e.target.value);
    setSelectedScreen("");
    setSeatLayout([]);
    setSeats([]);
    setBookedSeats([]);
    setSelectedDate("");
  };

  const handleScreenChange = (e) => {
    setSelectedScreen(e.target.value);
    setSeatLayout([]);
    setSeats([]);
    setBookedSeats([]);
    setSelectedDate("");
  };

  const handleShowtimeChange = (e) => {
    setSelectedShowtime(e.target.value);
    setSeats([]);
    setBookedSeats([]);
    setSelectedDate("");
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
      if (!selectedDate) {
        alert("Please select a date");
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
        date: selectedDate,
      };

      navigate("/payment-simulation", { state: { ...bookingData, totalPrice } });
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
    <div className="booking-container">
      <h2 className="booking-title">Book Tickets for {movie.title}</h2>

      <div className="form-group">
        <label className="form-label" htmlFor="theater">Select Theater</label>
        <select
          id="theater"
          className="form-select"
          value={selectedTheater}
          onChange={handleTheaterChange}
        >
          <option value="">Select a Theater</option>
          {theaters.map((theater) => (
            <option key={theater._id} value={theater._id}>
              {theater.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTheater && (
        <div className="form-group">
          <label className="form-label" htmlFor="screen">Select Screen</label>
          <select
            id="screen"
            className="form-select"
            value={selectedScreen}
            onChange={handleScreenChange}
          >
            <option value="">Select a Screen</option>
            {availableScreens.map((screen) => (
              <option key={screen.screenNumber} value={screen.screenNumber}>
                Screen {screen.screenNumber}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedTheater && selectedScreen && (
        <div className="form-group">
          <label className="form-label" htmlFor="showtime">Select Showtime</label>
          <select
            id="showtime"
            className="form-select"
            value={selectedShowtime}
            onChange={handleShowtimeChange}
          >
            <option value="">Select a Showtime</option>
            {movie.showtimes && movie.showtimes.length > 0
              ? movie.showtimes.map((showtime, index) => (
                <option key={index} value={showtime}>
                  {showtime}
                </option>
              ))
              : SHOWTIMES.map((showtime, index) => (
                <option key={index} value={showtime}>
                  {showtime}
                </option>
              ))}
          </select>
        </div>
      )}

      {selectedTheater && selectedScreen && selectedShowtime && (
        <div className="form-group">
          <label className="form-label" htmlFor="date">Select Date</label>
          <input
            type="date"
            id="date"
            className="form-date"
            value={selectedDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      )}

      {selectedTheater &&
        selectedScreen &&
        selectedShowtime &&
        selectedDate &&
        seatLayout.length > 0 && (
          <div className="seats-section">
            <h3 className="seats-title">Select Seats</h3>
            <div className="seats-grid">
              {seatLayout.map((seat) => {
                const isBooked = bookedSeats.includes(seat.number);
                const seatClass = seat-label ${seat.type.toLowerCase()} ${isBooked ? 'booked' : ''};
                return (
                  <label
                    key={seat.number}
                    className={seatClass}
                  >
                    <span className="seat-number">{seat.number}</span>
                    <span className="seat-type">{seat.type}</span>
                    <input
                      type="checkbox"
                      value={${seat.number}-${seat.type}}
                      onChange={handleSeatChange}
                      disabled={isBooked}
                      style={{ display: 'none' }}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        )}

      {seats.length > 0 && (
        <div className="booking-summary">
          <h3 className="total-price">Total Price: ${totalPrice}</h3>
          <button
            onClick={handleBooking}
            className="book-button"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default BookMovie;











