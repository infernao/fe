import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CreditCard, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import "../paymentSimulation.css";

const PaymentSimulation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!bookingData) {
            alert("No booking data found, redirecting to home...");
            navigate("/");
        }
    }, [bookingData, navigate]);

    const handlePayment = async (success) => {
        if (!bookingData) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                "https://movie-booking-bxks.onrender.com/api/bookings",
                {
                    ...bookingData,
                    paymentStatus: success ? "successful" : "failed",
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 201 && success) {
                alert("Payment Successful! Booking Confirmed.");
                navigate("/my-bookings");
            } else {
                throw new Error("Unexpected response from server.");
            }
        } catch (error) {
            console.error("Payment Error:", error.response?.data?.message || error.message);
            setError(error.response?.data?.message || "Payment failed, please try again.");
            alert("Payment Failed! Redirecting to Home...");
            navigate("/");
        } finally {
            setLoading(false);
        }
    };

    if (!bookingData) return null;

    return (
        <div className="payment-container">
            <div className="payment-card">
                <div className="payment-header">
                    <CreditCard />
                    <h2>Payment Simulation</h2>
                </div>

                <div className="payment-content">
                    <div className="booking-details">
                        <div className="detail-item">
                            <p className="detail-label">Movie</p>
                            <p className="detail-value">{bookingData.movieTitle}</p>
                        </div>
                        <div className="detail-item">
                            <p className="detail-label">Theater</p>
                            <p className="detail-value">{bookingData.theaterId}</p>
                        </div>
                        <div className="detail-item">
                            <p className="detail-label">Screen</p>
                            <p className="detail-value">{bookingData.screenNumber}</p>
                        </div>
                        <div className="detail-item">
                            <p className="detail-label">Showtime</p>
                            <p className="detail-value">{bookingData.showtime}</p>
                        </div>
                    </div>

                    <div className="seats-container">
                        <p className="detail-label">Selected Seats</p>
                        <div className="seats-list">
                            {bookingData.seats.map((seat) => (
                                <span key={seat} className="seat-tag">
                                    {seat}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="total-amount">
                        <p className="total-amount-label">Total Amount</p>
                        <p className="total-amount-value">₹{bookingData.totalPrice}</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <AlertCircle />
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="buttons-container">
                        <button
                            onClick={() => handlePayment(true)}
                            disabled={loading}
                            className="button button-success"
                        >
                            <CheckCircle2 />
                            {loading ? "Processing..." : "Pay Successfully"}
                        </button>
                        <button
                            onClick={() => handlePayment(false)}
                            disabled={loading}
                            className="button button-danger"
                        >
                            <XCircle />
                            {loading ? "Processing..." : "Fail Payment"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSimulation;


