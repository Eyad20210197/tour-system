import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

function BookingDetails() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user && user.role === "agency") {
      fetch(`http://localhost:5500/bookings?agencyId=${user.id}`)
        .then(res => res.json())
        .then(data => setBookings(data));
    }
  }, [user]);

  const handleStatus = (id, action) => {
    fetch(`http://localhost:5500/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: action }),
    })
      .then(() =>
        setBookings(prev =>
          prev.map(b => (b.id === id ? { ...b, status: action } : b))
        )
      );
  };

  return (
    <div className="bookings box-element">
      <h1>Booking Requests</h1>

      <ul className="Grid">
        {bookings.map(booking => (
          <li key={booking.id}>
            <p>Tourist: {booking.username}</p>
            <p>Tour: {booking.tourName}</p>
            <p>Status: {booking.status}</p>
            {booking.status === "pending" && (
              <div className="buttons">
                <button onClick={() => handleStatus(booking.id, "approved")}>Approve</button>
                <button onClick={() => handleStatus(booking.id, "rejected")}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default BookingDetails;
