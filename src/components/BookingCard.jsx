import React from "react";
import "../CardBackground.css";
const BookingCard = ({ booking }) => {
  const bookingDate = booking.date
    ? new Date(booking.date)
    : new Date("2025-02-16");
  const formattedDate = bookingDate.toLocaleDateString();

  return (
    <div className="card"
    // style={{
    //   border: "1px solid #ccc",
    //   padding: "10px",
    //   margin: "10px",
    //   width: "300px",
    //}}
    >
      <h3>Booking ID: {booking._id}</h3>
      <p>Movie: {booking.movieId?.title}</p>
      <p>Theater: {booking.theaterId?.name}</p>
      <p>Screen: {booking.screenNumber}</p>
      <p>Seats: {booking.seats.join(", ")}</p>
      <p>Showtime: {booking.showtime}</p>
      <p>Date: {formattedDate}</p>
      <p>Payment Status: {booking.paymentStatus}</p>
    </div>
  );
};

export default BookingCard;


