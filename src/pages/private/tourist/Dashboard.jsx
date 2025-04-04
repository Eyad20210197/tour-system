import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function TouristDashboard() {
    const { user } = useContext(AuthContext);
    const [assignedTours, setAssignedTours] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5500/tours?touristId=${user.id}`)
                .then(response => response.json())
                .then(data => setAssignedTours(data))
                .catch(error => console.error("Error fetching assigned tours:", error));
        }
    }, [user]);

    return (
        <div>
            <h1>Assigned Tours</h1>
            {assignedTours.length === 0 ? (
                <p>No tours assigned yet.</p>
            ) : (
                <ul>
                    {assignedTours.map((tour) => (
                        <li key={tour.id}>
                            <h3>{tour.name}</h3>
                            <p>Category: {tour.category}</p>
                            <p>Price: ${tour.price}</p>
                            <p>Duration: {tour.duration}</p>
                            <p>Seats Available: {tour.seats}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TouristDashboard;
