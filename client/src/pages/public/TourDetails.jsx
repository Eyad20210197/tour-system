import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getTourById, createBooking, updateTour } from "../../api/api";

function TourDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [tour, setTour] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getTourById(id)
            .then((res) => {
                console.log("Tour fetched:", res.data); //  Debug line
                setTour(res.data);
            })
            .catch((err) => console.error("Error fetching tour details:", err));
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
            status: "pending",
            agencyId: tour.agencyId || null,
            agencyName: tour.agencyName || "Unknown"
        };

        createBooking(bookingData)
            .then(() => {
                // Update the seats
                return updateTour(tour.id, { ...tour, seats: tour.seats - 1 });
            })
            .then(() => {
                setMessage("Booking request sent! Waiting for agency approval.");
                setTour(prev => ({ ...prev, seats: prev.seats - 1 }));

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
            .catch((err) => {
                console.error("Error sending booking request:", err);
                setMessage("Booking failed.");
            });
    };

    if (!tour) return <p>Loading tour details...</p>;

    return (
        <div className="tour-details" style={{
            backgroundImage: `url(/images/${tour.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '40px',
            color: 'white',
            minHeight: '100vh'
        }}>
            <div className="card">
                <h1>{tour.name}</h1>
                <p><strong>Category:</strong> {tour.category}</p>
                <p><strong>Price:</strong> ${tour.price}</p>
                <p><strong>Duration:</strong> {tour.duration}</p>
                <p><strong>Seats Available:</strong> {tour.seats}</p>
                {message && <p style={{ color: "green" }}>{message}</p>}
                <button onClick={handleBooking}>Book Now</button>
            </div>
        </div>


    );
}

export default TourDetails;
