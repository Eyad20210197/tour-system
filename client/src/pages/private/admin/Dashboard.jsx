
import { useNavigate } from "react-router-dom";

function Dashboard() {
   
    const navigate = useNavigate();


    return (
        <div className="dashboard">

            <h1>Admin Dashboard</h1>
            <div className="btn">
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
        </div>
    );
}

export default Dashboard;
