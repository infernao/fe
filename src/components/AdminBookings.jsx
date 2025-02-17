import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token'); // Get token from storage
            const response = await axios.get('https://movie-booking-bxks.onrender.com/api/bookings/all', {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token
                },
            });
            console.log(response.data);
            setBookings(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            console.log("Canceling booking with ID:", bookingId);
            const token = localStorage.getItem('token');
            await axios.delete(`https://movie-booking-bxks.onrender.com/api/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token
                },
            });
            console.log("Booking canceled successfully!");
            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (err) {
            alert('Failed to cancel booking. Try again.');
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>Error loading bookings: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Manage Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Movie</th>
                            <th>Theater</th>
                            <th>Screen</th>
                            <th>Showtime</th>
                            <th>Seats</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>{booking.userId?.username || "Unknown User"}</td>
                                <td>{booking.movieId?.title || "Unknown Movie"}</td>
                                <td>{booking.theaterId?.name || "Unknown Theater"}</td>
                                <td>{booking.screenNumber}</td>
                                <td>{booking.showtime}</td>
                                <td>{booking.seats?.join(", ") || "No seats"}</td>
                                <td>
                                    <button onClick={() => handleCancelBooking(booking._id)} style={{ backgroundColor: "red", color: "white" }}>
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminBookings;
