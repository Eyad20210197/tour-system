import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
function TouragencyDashboard() {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        if (user && user.id) {  // Ensure user exists and has an ID
            fetch(`http://localhost:5500/bookings?userId=${user.id}`)
                .then(response => response.json())
                .then(data => setBookings(data))
                .catch(error => console.error("Error fetching bookings:", error));
        }
    }, [user]);

    
    return (
        <div className="dashboard"> 
           <h1>tour-agency dashboard</h1>
           <button onClick={()=>navigate('/TourPackages')}>Manage tour packages</button>
           <button onClick={()=>navigate('/BookingDetails')}>Manage bookings details</button>
        </div>
    );
}

export default TouragencyDashboard;
