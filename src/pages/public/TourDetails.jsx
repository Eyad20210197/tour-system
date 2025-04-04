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
<<<<<<< HEAD
=======

>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
        if (tour.seats === 0) {
            setMessage("No seats available for this tour.");
            return;
        }

<<<<<<< HEAD
        const bookingData = {
=======
        const bookingRequest = {
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
            tourId: tour.id,
            userId: user.id,
            username: user.username,
            tourName: tour.name,
            price: tour.price,
<<<<<<< HEAD
=======
            status: "pending", // ✅ Wait for agency approval
            agencyId: tour.agencyId || null,
            agencyName: tour.agencyName || "Unknown"
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
        };

        fetch("http://localhost:5500/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
<<<<<<< HEAD
            body: JSON.stringify(bookingData),
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:5500/tours/${tour.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ seats: tour.seats - 1 }),
                });

                setMessage("Booking successful!");
=======
            body: JSON.stringify(bookingRequest),
        })
            .then(() => {
                setMessage("Booking request sent! Waiting for agency approval.");
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0

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
<<<<<<< HEAD
            .catch(error => console.error("Error booking tour:", error));
=======
            .catch(error => console.error("Error sending booking request:", error));
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
    };

    if (!tour) return <p>Loading tour details...</p>;

    return (
<<<<<<< HEAD
        <div className="tour-details">  
=======
        <div className="tour-details">
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
            <h1>{tour.name}</h1>
            <p><strong>Category:</strong> {tour.category}</p>
            <p><strong>Price:</strong> ${tour.price}</p>
            <p><strong>Duration:</strong> {tour.duration}</p>
            <p><strong>Seats Available:</strong> {tour.seats}</p>
            <p><strong>Description:</strong> {tour.description}</p>

<<<<<<< HEAD
            {message && <p style={{ color: "red" }}>{message}</p>}
            <button onClick={handleBooking}>Book Now</button> 
=======
            {message && <p style={{ color: "green" }}>{message}</p>}
            <button onClick={handleBooking}>Book Now</button>
>>>>>>> 5e67217acbb0e3135771684be00f384a4cd18cf0
        </div>
    );
}

export default TourDetails;
