import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function TouragencyDashboard() {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5500/bookings?userId=${user.id}`)
                .then(response => response.json())
                .then(data => setBookings(data))
                .catch(error => console.error("Error fetching bookings:", error));
        }
    }, [user]);

    const cancelBooking = (bookingId , tourId) => {
        fetch(`http://localhost:5500/bookings/${bookingId}`, {
            method: "DELETE",
        })
            .then(() => {
                fetch(`http://localhost:5500/tours/${tourId}`)
                .then(response => response.json())
                .then(tour => {
                    fetch(`http://localhost:5500/tours/${tourId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ seats: tour.seats + 1 }),
                    });
                });
                setBookings(bookings.filter(booking => booking.id !== bookingId)); 
            })
            .catch(error => console.error("Error canceling booking:", error));
    };

    return (
        <div>
            <h1>My Bookings</h1>
            {bookings.length === 0 ? (
                <p>You have no bookings yet.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id}>
                            <h3>{booking.tourName}</h3>
                            <p>Price: ${booking.price}</p>
                            <button onClick={() => cancelBooking(booking.id, booking.tourId)}>Cancel Booking</button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TouragencyDashboard;
