import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import TourList from "../pages/public/Tours";
import TourDetails from "../pages/public/TourDetails";
import ProtectedRoute from "../components/ProtectedRoute";

// Tourist
import TouristDashboard from "../pages/private/tourist/Dashboard";
import Complaints from "../pages/private/tourist/Complaints";

// Admin
import AdminDashboard from "../pages/private/admin/Dashboard";
import ManageUsers from "../pages/private/admin/ManageUsers";
import ManageBookings from "../pages/private/admin/ManageBookings";
import ManageTours from "../pages/private/admin/ManageTours";
import ManageComplaints from "../pages/private/admin/ManageComplaints";
import ManageAgenciesRequests from "../pages/private/admin/ManageAgenciesRequests";

// Agency
import TouragencyDashboard from "../pages/private/tour-agency/Dashboard";
import BookingDetails from "../pages/private/tour-agency/BookingDetails";
import TourPackages from "../pages/private/tour-agency/TourPackages";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/tours" element={<TourList />} />
            <Route path="/tours/:id" element={<TourDetails />} />

            {/* Tourist */}
            <Route
                path="/dashboard/tourist"
                element={
                    <ProtectedRoute allowedRoles={["tourist"]}>
                        <TouristDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/complaints"
                element={
                    <ProtectedRoute allowedRoles={["tourist"]}>
                        <Complaints />
                    </ProtectedRoute>
                }
            />

            {/* Admin */}
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

            {/* Tour Agency */}
            <Route
                path="/dashboard/agency"
                element={
                    <ProtectedRoute allowedRoles={["agency"]}>
                        <TouragencyDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/agency/BookingDetails"
                element={
                    <ProtectedRoute allowedRoles={["agency"]}>
                        <BookingDetails />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard/agency/TourPackages"
                element={
                    <ProtectedRoute allowedRoles={["agency"]}>
                        <TourPackages />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
