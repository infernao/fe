import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import BookingCard from '../components/BookingCard';
import Loading from '../components/Loading';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/user');
                const validBookings = response.data.filter(booking => booking.movieId?.title); // Filter valid bookings
                setBookings(validBookings);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to fetch bookings. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);


    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await api.delete(`/bookings/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId)); // Update UI
            alert('Booking canceled successfully!');
        } catch (error) {
            console.error('Error canceling booking:', error);
            alert('Failed to cancel the booking. Please try again.');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>My Bookings</h2>

            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {bookings.map(booking => (
                        <div key={booking._id} style={{ position: 'relative' }}>
                            <BookingCard booking={booking} />
                            <button
                                onClick={() => handleCancelBooking(booking._id)}
                                style={{
                                    backgroundColor: '#ff4d4d',
                                    color: 'white',
                                    padding: '8px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    width: '100%',
                                    marginTop: '10px',
                                }}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
