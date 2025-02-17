import React from "react";
import AddMovieForm from "../components/AddMovieForm";
import AddTheaterForm from "../components/AddTheaterForm";
import AdminBookings from "../components/AdminBookings";
import ManageTheaters from "../components/ManageTheater";
import ManageMovies from "../components/ManageMovies"; // Import new component

const AdminDashboard = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h2>Admin Dashboard</h2>

            <div style={{ marginBottom: "20px" }}>
                <h3>Add New Movie</h3>
                <AddMovieForm />
            </div>

            <ManageMovies /> {/* Include the ManageMovies component */}

            <div>
                <h3>Add New Theater</h3>
                <AddTheaterForm />
            </div>

            <div>
                <h3>Manage Bookings</h3>
                <AdminBookings />
            </div>

            <div>
                <h3>Manage Existing Theaters and Screens</h3>
                <ManageTheaters />
            </div>
        </div>
    );
};

export default AdminDashboard;
