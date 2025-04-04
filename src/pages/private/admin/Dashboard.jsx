import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5500/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);
    
    return (
        <div className="dashboard">

            <h1>Admin Dashboard</h1>

            <button onClick={() => navigate("/dashboard/admin/tours")}>
                Manage Tours
            </button>

            <button onClick={() => navigate("/dashboard/admin/users")}>
                Manage Users
            </button>

            <button onClick={() => navigate("/dashboard/admin/bookings")}>
                Manage Bookings
            </button>

            <button onClick={() => navigate("/dashboard/admin/complaints")}>
                Manage Complaints
            </button>

            <button onClick={() => navigate("/dashboard/admin/agency-requests")}>
                Manage Agency Requests
            </button>
        </div>
    );
}

export default Dashboard;
