import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function TouristDashboard() {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5055/api/bookings?userId=${user.id}`)
                .then(res => res.json())
                .then(data => setBookings(data))
                .catch(err => console.error("Error fetching bookings:", err));
        }
    }, [user]);

    const cancelBooking = (bookingId) => {
        fetch(`http://localhost:5055/api/bookings/${bookingId}`, {
            method: "DELETE",
        })
            .then(() => {
                setBookings(prev => prev.filter(b => b.id !== bookingId));
            })
            .catch(err => console.error("Error canceling booking:", err));
    };

    const pending = bookings.filter(b => b.status === "pending");
    const approved = bookings.filter(b => b.status === "approved");

    return (
        <div className="dashboard" id="tourist">
            <h1>My Bookings</h1>
            <div className="Box">
                {bookings.length === 0 && <p>You have no bookings yet.</p>}

                {/* Pending Bookings Section */}
                {pending.length > 0 && (
                    <div className="box-element">
                        <h2>Pending Bookings</h2>
                        <ul>
                            {pending.map((b) => (
                                <li key={b.id}>
                                    <h3>{b.tourName}</h3>
                                    <p>Price: ${b.price}</p>
                                    <p>Status: {b.status}</p>
                                    <button onClick={() => cancelBooking(b.id)}>Cancel Request</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Approved Bookings Section */}
                {approved.length > 0 && (
                    <div className="box-element">
                        <h2>Approved Bookings</h2>
                        <ul>
                            {approved.map((b) => (
                                <li key={b.id}>
                                    <h3>{b.tourName}</h3>
                                    <p>Price: ${b.price}</p>
                                    <p>Status: {b.status}</p>

                                    {b.review ? (
                                        <>
                                            <p><strong>Your Review:</strong> {b.review}</p>
                                            <p><strong>Your Rating:</strong> {b.rating}/5</p>
                                        </>
                                    ) : (
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const form = e.target;
                                                const review = form.review.value;
                                                const rating = form.rating.value;

                                                fetch(`http://localhost:5055/api/bookings/${b.id}`, {
                                                    method: "PATCH",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ review, rating }),
                                                })
                                                    .then(() => {
                                                        setBookings(prev =>
                                                            prev.map(booking =>
                                                                booking.id === b.id
                                                                    ? { ...booking, review, rating }
                                                                    : booking
                                                            )
                                                        );
                                                    })
                                                    .catch(err => console.error("Error submitting review:", err));
                                            }}
                                        >
                                            <textarea name="review" placeholder="Write your review" required />
                                            <br />
                                            <select name="rating" required>
                                                <option value="">Rating</option>
                                                <option value="1">1 - Poor</option>
                                                <option value="2">2 - Fair</option>
                                                <option value="3">3 - Good</option>
                                                <option value="4">4 - Very Good</option>
                                                <option value="5">5 - Excellent</option>
                                            </select>
                                            <br />
                                            <button type="submit">Submit Review</button>
                                        </form>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <button id="bttn" onClick={() => navigate("/complaints")}>
                Submit a Complaint
            </button>
        </div>
    );
}

export default TouristDashboard;
