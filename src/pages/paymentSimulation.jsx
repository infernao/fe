import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
                "http://localhost:5000/api/bookings",
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

    return (
        <div>
            <h2>Payment Simulation</h2>
            <p>Movie: {bookingData?.movieTitle}</p>
            <p>Theater: {bookingData?.theaterId}</p>
            <p>Screen: {bookingData?.screenNumber}</p>
            <p>Showtime: {bookingData?.showtime}</p>
            <p>Seats: {bookingData?.seats?.join(", ")}</p>
            <p>Total Price: ${bookingData?.totalPrice}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={() => handlePayment(true)} disabled={loading}>
                {loading ? "Processing..." : "Pay Successfully"}
            </button>
            <button onClick={() => handlePayment(false)} disabled={loading}>
                {loading ? "Processing..." : "Fail Payment"}
            </button>
        </div>
    );
};

export default PaymentSimulation;


