import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function TourDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tour, setTour] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5500/tours/${id}`)
            .then(response => response.json())
            .then(data => setTour(data))
            .catch(error => console.error("Error fetching tour details:", error));
    }, [id]);

    const handleBooking = () => {
        if (!user) {
            setMessage("You must be logged in to book a tour.");
            return;
        }

        if (tour.seats === 0) {
            setMessage("No seats available for this tour.");
            return;
        }


        const bookingData = {
            tourId: tour.id,
            userId: user.id,
            username: user.username,
            tourName: tour.name,
            price: tour.price,
            status: "pending", // ✅ Wait for agency approval
            agencyId: tour.agencyId || null,
            agencyName: tour.agencyName || "Unknown"
        };

        fetch("http://localhost:5500/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        })
            .then(() => {
                setMessage("Booking request sent! Waiting for agency approval.");

                setTimeout(() => {
                    if (user.role === "tourist") {
                        navigate("/dashboard/tourist");
                    } else if (user.role === "guide") {
                        navigate("/dashboard/guide");
                    } else if (user.role === "admin") {
                        navigate("/dashboard/admin");
                    } else {
                        navigate("/");
                    }
                }, 1000);
            })

            .catch(error => console.error("Error sending booking request:", error));
    };

    if (!tour) return <p>Loading tour details...</p>;

    return (
        <div className="tour-details">
            <h1>{tour.name}</h1>
            <p><strong>Category:</strong> {tour.category}</p>
            <p><strong>Price:</strong> ${tour.price}</p>
            <p><strong>Duration:</strong> {tour.duration}</p>
            <p><strong>Seats Available:</strong> {tour.seats}</p>
            <p><strong>Description:</strong> {tour.description}</p>

            {message && <p style={{ color: "green" }}>{message}</p>}
            <button onClick={handleBooking}>Book Now</button>
        </div>
    );
}

export default TourDetails;
