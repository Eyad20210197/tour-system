
import { useNavigate } from "react-router-dom";
function TouragencyDashboard() {

    const navigate = useNavigate();
 
    return (
        <div className="dashboard">
            <h1>tour-agency dashboard</h1>
            <div className="btn">
                <button onClick={() => navigate('/dashboard/agency/TourPackages')}>Manage tour packages</button>
                <button onClick={() => navigate('/dashboard/agency/BookingDetails')}>Manage bookings details</button>
            </div>
        </div>
    );
}

export default TouragencyDashboard;
