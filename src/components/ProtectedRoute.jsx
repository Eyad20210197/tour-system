import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user ,loading } = useContext(AuthContext);

    if (loading)
        return <div>Loading...</div>; // Show loading state while checking authentication

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    } 

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Redirect if not authorized
    }

    return children;
};

export default ProtectedRoute;
