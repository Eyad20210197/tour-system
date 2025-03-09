import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Tours() {
    const [tours, setTours] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5500/tours")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Tours:", data); 
                setTours(data);
            })
            .catch(error => console.error("Error fetching tours:", error));
    }, []);

    return (
        <div className="tour-list">
            <h1>Available Tours</h1>
            {tours.length === 0 ? (
                <p>No tours available.</p>
            ) : (
                <ul>
                    {tours.map((tour) => (
                        <li key={tour.id} className="tour-item">
                            <h3>{tour?.name || "No Name Available"}</h3>
                            <p><strong>Category:</strong> {tour?.category || "N/A"}</p>
                            <p><strong>Price:</strong> ${tour?.price || "N/A"}</p>
                            <p><strong>Duration:</strong> {tour?.duration || "N/A"}</p>
                            <p><strong>Seats Available:</strong> {tour?.seats || "N/A"}</p>
                            <p><strong>Description:</strong> {tour?.description || "N/A"}</p>
                            <Link to={`/tours/${tour.id}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Tours;
