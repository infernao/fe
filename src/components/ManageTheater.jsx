import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTheaters = () => {
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTheaters = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://movie-booking-bxks.onrender.com/api/theaters/', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token
                    },
                });
                setTheaters(response.data);
            } catch (error) {
                console.error("Error fetching theaters", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTheaters();
    }, []);

    const handleAddScreen = async (theaterId) => {
        const standardPrice = prompt("Enter Standard seat price:");
        const premiumPrice = prompt("Enter Premium seat price:");

        if (!standardPrice || !premiumPrice) {
            alert("Please enter valid prices.");
            return;
        }

        // Find the current theater from state
        const currentTheater = theaters.find((theater) => theater._id === theaterId);
        const existingScreenNumbers = currentTheater?.screens?.map(screen => screen.screenNumber) || [];
        const newScreenNumber = existingScreenNumbers.length > 0
            ? Math.max(...existingScreenNumbers) + 1
            : 1; // Dynamic screen number

        const seatPrices = {
            Standard: parseFloat(standardPrice),
            Premium: parseFloat(premiumPrice),
        };

        console.log("Seat Prices being sent:", seatPrices);

        const screenData = {
            screenNumber: newScreenNumber,
            totalSeats: 150,
            seatLayout: "VIP",
            showtimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
            seatPrices: seatPrices,  // Ensuring it's present in the request
        };

        try {
            const token = localStorage.getItem("token");
            await axios.post(`https://movie-booking-bxks.onrender.com/api/theaters/${theaterId}/screen`, screenData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            setTheaters(theaters.map((theater) =>
                theater._id === theaterId
                    ? { ...theater, screens: [...theater.screens, screenData] }
                    : theater
            ));
        } catch (error) {
            console.error("Error adding screen:", error.response?.data || error.message);
            alert("Failed to add screen. Check console for details.");
        }
    };




    const handleDeleteScreen = async (theaterId, screenId) => {
        try {
            console.log(`Deleting screen ${screenId} from theater ${theaterId}`);
            const token = localStorage.getItem('token');
            await axios.delete(`https://movie-booking-bxks.onrender.com/api/theaters/${theaterId}/screen/${screenId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token
                },
            });
            const updatedTheaters = theaters.map(theater => {
                if (theater._id === theaterId) {
                    theater.screens = theater.screens.filter(screen => screen._id !== screenId);
                }
                return theater;
            });
            setTheaters(updatedTheaters);
        } catch (error) {
            console.error("Error deleting screen", error);
            alert("Failed to delete screen. Try again.");
        }
    };

    const handleDeleteTheater = async (theaterId) => {
        const confirmation = window.confirm("Are you sure you want to delete this theater?");
        if (confirmation) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`https://movie-booking-bxks.onrender.com/api/theaters/${theaterId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token
                    },
                });
                setTheaters(theaters.filter(theater => theater._id !== theaterId));
            } catch (error) {
                console.error("Error deleting theater", error);
                alert('Failed to delete theater. Try again.');
            }
        }
    };

    return (
        <div>
            {loading ? <p>Loading theaters...</p> : (
                <div>
                    {theaters.map(theater => (
                        <div key={theater._id} style={{ marginBottom: '20px' }}>
                            <h4>{theater.name}</h4>
                            <p>{theater.location}</p>

                            <h5>Screens</h5>
                            <ul>
                                {theater.screens.map(screen => (
                                    <li key={screen._id}>
                                        <p>Screen {screen.screenNumber}</p>
                                        {console.log('screen._id:', screen._id)}
                                        <button onClick={() => handleDeleteScreen(theater._id, screen._id.toString())}>Delete Screen</button>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={() => handleAddScreen(theater._id)}>Add New Screen</button>
                            <button onClick={() => handleDeleteTheater(theater._id)} style={{ color: 'red' }}>Delete Theater</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageTheaters;
