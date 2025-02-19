import React, { useState, useEffect } from "react";
import api from "../utils/api";
import BookingCard from "../components/BookingCard";
import Loading from "../components/Loading";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get("/bookings/user");

                // Filter bookings to include only those with a valid movie title and date.
                const validBookings = response.data.filter(
                    (booking) => booking.movieId?.title && booking.date
                );

                // Create a "today" date set at midnight for accurate comparison.
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                // Split bookings into future (including today) and past.
                const futureBookings = validBookings.filter((booking) => {
                    const bookingDate = new Date(booking.date);
                    bookingDate.setHours(0, 0, 0, 0);
                    return bookingDate >= today;
                });

                const pastBookings = validBookings.filter((booking) => {
                    const bookingDate = new Date(booking.date);
                    bookingDate.setHours(0, 0, 0, 0);
                    return bookingDate < today;
                });

                // Sort future bookings in ascending order (closest future date first)
                futureBookings.sort((a, b) => new Date(a.date) - new Date(b.date));

                // Sort past bookings in descending order (most recent past date first)
                pastBookings.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Combine future bookings first, then past bookings.
                const combinedBookings = [...futureBookings, ...pastBookings];

                setBookings(combinedBookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
                setError("Failed to fetch bookings. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) {
            return;
        }

        try {
            await api.delete(`/bookings/${bookingId}`);
            setBookings(bookings.filter((booking) => booking._id !== bookingId));
            alert("Booking canceled successfully!");
        } catch (error) {
            console.error("Error canceling booking:", error);
            alert("Failed to cancel the booking. Please try again.");
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>My Bookings</h2>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                    }}
                >
                    {bookings.map((booking) => {
                        // Compute bookingDate and compare to today for "expired" status.
                        const bookingDate = booking.date ? new Date(booking.date) : new Date("2025-02-16");
                        bookingDate.setHours(0, 0, 0, 0);
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isExpired = bookingDate < today;

                        return (
                            <div key={booking._id} style={{ position: "relative" }}>
                                <BookingCard booking={booking} />
                                <button
                                    onClick={() => handleCancelBooking(booking._id)}
                                    disabled={isExpired}
                                    style={{
                                        backgroundColor: isExpired ? "#cccccc" : "#ff4d4d",
                                        color: "white",
                                        padding: "8px",
                                        border: "none",
                                        cursor: isExpired ? "not-allowed" : "pointer",
                                        width: "100%",
                                        marginTop: "10px",
                                    }}
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyBookings;






