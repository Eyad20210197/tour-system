import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import TourList from "./pages/public/Tours";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import TourDetails from "./pages/public/TourDetails";

// Import private pages
import TouristDashboard from "./pages/private/tour-agency/Dashboard";
import GuideDashboard from "./pages/private/tourist/Dashboard";
import AdminDashboard from "./pages/private/admin/Dashboard";
import ManageTours from "./pages/private/admin/ManageTours";
import ManageUsers from "./pages/private/admin/ManageUsers";
import ManageBookings from "./pages/private/admin/ManageBookings";
import ManageComplaints from "./pages/private/admin/ManageComplaints";
import ManageAgenciesRequests from "./pages/private/admin/ManageAgenciesRequests";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tours" element={<TourList />} />
                <Route path="/tours/:id" element={<TourDetails />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard/tourist"
                    element={
                        <ProtectedRoute allowedRoles={["tourist"]}>
                            <TouristDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/guide"
                    element={
                        <ProtectedRoute allowedRoles={["guide"]}>
                            <GuideDashboard />
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
            <Footer></Footer>
        </Router>
        
    );
}

export default App;
