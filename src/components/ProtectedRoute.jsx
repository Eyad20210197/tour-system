import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />; // Redirect if not authorized
    }

    return children;
};

export default ProtectedRoute;
