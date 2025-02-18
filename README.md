# Infernao Movie Ticket Booking - Frontend

The frontend of the **Infernao Movie Ticket Booking System** is built with **React** and **Vite** for fast development and hot-reloading.
It's a simple frontend ui design with basic styling.
This application allows users to search for movies, book tickets, view past bookings, and more. **Admin users** have access to additional functionalities for managing movies, theaters, and bookings.

## 📌 Table of Contents
- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Components Overview](#components-overview)
- [Pages Overview](#pages-overview)

---

## 🎬 Project Overview
This **React application** serves as the **frontend** for the Infernao Movie Ticket Booking System. It allows users to:

✅ View a list of movies.  
✅ Book tickets for movies at specific theaters and times.  
✅ View and manage their past and upcoming bookings.  
✅ Register and log in to the system.  

🔑 **Admin users** can manage movies, theaters, screens, and bookings.

---

## 🚀 Technologies Used
- **React** - A JavaScript library for building user interfaces.
- **Vite** - A build tool and development server for fast and optimized React applications.
- **CSS** - Used for styling the components and pages.
- **Axios** - For making HTTP requests to the backend API.

---

## 🎭 Features
### 🔹 User Features:
- View a list of available movies and theaters.
- Book tickets for movies, select showtimes, and seats.
- View and manage their bookings in the **"My Bookings"** page.
- Register an account and log in to access bookings.

### 🔹 Admin Features:
- Add and manage movies through the **"Manage Movies"** page.
- Add and manage theaters and screens via the **"Manage Theater"** page.
- View and manage user bookings in the **"Admin Bookings"** page.

### 🔹 Authentication:
- **Login** and **Register** for users.
- **Protected routes** for authenticated users and admins (via `ProtectedRoute.jsx`).

---

## Installation & Setup

### **Prerequisites**
Before running the project, ensure that you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)


## Steps to Install

### 1️⃣ Clone the repository to your local machine:
git clone https://github.com/your-username/infernao-fe.git

### 2️⃣ Navigate to the project folder:
cd infernao-fe

### 3️⃣ Install the required dependencies for the backend:
npm install

---

## 📂 Components Overview
### ✅ Reusable Components
| Component | Description |
|-----------|------------|
| `Navbar.jsx` | Displays the top navigation menu for users. |
| `BookingCard.jsx` | Displays individual booking details. |
| `MovieCard.jsx` | Displays individual movie details. |
| `Loading.jsx` | A loading spinner displayed when waiting for data. |
| `ProtectedRoute.jsx` | Protects certain routes to be accessed only by authenticated users. |

### ✅ Admin Components
| Component | Description |
|-----------|------------|
| `AddMovieForm.jsx` | Form to add a new movie to the system. |
| `AddTheaterForm.jsx` | Form to add a new theater. |
| `ManageMovies.jsx` | Admin page to manage the list of movies. |
| `ManageTheater.jsx` | Admin page to manage theaters and screens. |
| `AdminBookings.jsx` | Admin page to manage bookings made by users. |

---

## 📄 Pages Overview
| Page | Description |
|------|------------|
| `Home.jsx` | Displays the homepage with available movies and theaters. |
| `Movies.jsx` | Displays a list of all movies. |
| `BookMovie.jsx` | Allows the user to select a movie, theater, and showtime to book tickets. |
| `MyBookings.jsx` | Displays a list of the user's past and upcoming bookings. |
| `Login.jsx` | User login page. |
| `Register.jsx` | User registration page. |
| `AdminDashboard.jsx` | Admin dashboard to manage movies, theaters, and bookings. |
| `Theaters.jsx` | Displays a list of available theaters. |
| `TheaterDetail.jsx` | Displays details for a selected theater, including screens and showtimes. |

---

