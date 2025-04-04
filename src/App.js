import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import TourList from "./pages/public/Tours";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import TourDetails from "./pages/public/TourDetails";

// Import private pages
<<<<<<< HEAD
import TouristDashboard from "./pages/private/tour-agency/Dashboard";
import GuideDashboard from "./pages/private/tourist/Dashboard";
=======
import AgencyDashboard from "./pages/private/tour-agency/Dashboard";
import TouristDashboard from "./pages/private/tourist/Dashboard";
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
import AdminDashboard from "./pages/private/admin/Dashboard";
import ManageTours from "./pages/private/admin/ManageTours";
import ManageUsers from "./pages/private/admin/ManageUsers";
import ManageBookings from "./pages/private/admin/ManageBookings";
import ManageComplaints from "./pages/private/admin/ManageComplaints";
import ManageAgenciesRequests from "./pages/private/admin/ManageAgenciesRequests";
<<<<<<< HEAD
import Header from "./components/Header";
import Footer from "./components/Footer";
=======
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0

function App() {
    return (
        <Router>
<<<<<<< HEAD
            <Header/>
=======
            <Navbar />
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tours" element={<TourList />} />
                <Route path="/tours/:id" element={<TourDetails />} />

                {/* Protected Routes */}
                <Route
<<<<<<< HEAD
                    path="/dashboard/tourist"
                    element={
                        <ProtectedRoute allowedRoles={["tourist"]}>
                            <TouristDashboard />
=======
                    path="/dashboard/agency"
                    element={
                        <ProtectedRoute allowedRoles={["agency"]}>
                            <AgencyDashboard />
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
                        </ProtectedRoute>
                    }
                />
                <Route
<<<<<<< HEAD
                    path="/dashboard/guide"
                    element={
                        <ProtectedRoute allowedRoles={["guide"]}>
                            <GuideDashboard />
=======
                    path="/dashboard/tourist"
                    element={
                        <ProtectedRoute allowedRoles={["tourist"]}>
                            <TouristDashboard />
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin/users"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManageUsers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin/bookings"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManageBookings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin/tours"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManageTours />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin/complaints"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManageComplaints />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/admin/agency-requests"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <ManageAgenciesRequests />
                        </ProtectedRoute>
                    }
                />
            </Routes>
<<<<<<< HEAD
            <Footer></Footer>
        </Router>
        
=======
        </Router>
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
    );
}

export default App;
