import { useEffect, useState } from "react";

function ManageBookings() {
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [tours, setTours] = useState([]);
    const [bookingData, setBookingData] = useState({
        userId: "",
        tourId: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editBookingId, setEditBookingId] = useState(null);

    useEffect(() => {
        // Get Bookings
        fetch("http://localhost:5055/api/bookings")
            .then((res) => res.json())
            .then((data) => Array.isArray(data) ? setBookings(data) : setBookings([]))
            .catch((err) => console.error("Error fetching bookings:", err));

        // Get Tourists
        fetch("http://localhost:5055/api/users")
            .then((res) => res.json())
            .then((data) => {
                const tourists = Array.isArray(data) ? data.filter(user => user.role === "tourist") : [];
                setUsers(tourists);
            })
            .catch((err) => console.error("Error fetching users:", err));

        // Get Tours
        fetch("http://localhost:5055/api/tours")
            .then((res) => res.json())
            .then((data) => Array.isArray(data) ? setTours(data) : setTours([]))
            .catch((err) => console.error("Error fetching tours:", err));
    }, []);

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleAddBooking = (e) => {
        e.preventDefault();
        const selectedUser = users.find(user => user.id === Number(bookingData.userId));
        const selectedTour = tours.find(tour => tour.id === Number(bookingData.tourId));

        if (!selectedUser || !selectedTour || selectedTour.seats === 0) {
            alert("Invalid booking. Check user, tour, and available seats.");
            return;
        }

        const newBooking = {
            userId: selectedUser.id,
            username: selectedUser.username,
            tourId: selectedTour.id,
            tourName: selectedTour.name,
            price: selectedTour.price,
            status: "approved"
        };

        fetch("http://localhost:5055/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking),
        })
            .then(res => res.json())
            .then((createdBooking) => {
                setBookings([...bookings, createdBooking]);
                setBookingData({ userId: "", tourId: "" });

                // Decrease tour seats
                fetch(`http://localhost:5055/api/tours/${selectedTour.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ seats: selectedTour.seats - 1 }),
                });
            })
            .catch(err => console.error("Error adding booking:", err));
    };

    const handleEditBooking = (booking) => {
        setEditMode(true);
        setEditBookingId(booking.id);
        setBookingData({ userId: booking.userId, tourId: booking.tourId });
    };

    const handleUpdateBooking = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5055/api/bookings/${editBookingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: Number(bookingData.userId),
                tourId: Number(bookingData.tourId),
            }),
        })
            .then(() => {
                setBookings(bookings.map(b =>
                    b.id === editBookingId ? { ...b, ...bookingData } : b
                ));
                setEditMode(false);
                setEditBookingId(null);
                setBookingData({ userId: "", tourId: "" });
            })
            .catch(err => console.error("Error updating booking:", err));
    };

    const handleDeleteBooking = (bookingId, tourId) => {
        fetch(`http://localhost:5055/api/bookings/${bookingId}`, {
            method: "DELETE",
        })
            .then(() => {
                // Increment tour seats after deletion
                fetch(`http://localhost:5055/api/tours/${tourId}`)
                    .then((res) => res.json())
                    .then((tour) => {
                        fetch(`http://localhost:5055/api/tours/${tourId}`, {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ seats: tour.seats + 1 }),
                        });
                    });
                setBookings(bookings.filter(b => b.id !== bookingId));
            })
            .catch(err => console.error("Error deleting booking:", err));
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Bookings</h1>

            <form onSubmit={editMode ? handleUpdateBooking : handleAddBooking} className="search">
                <select name="userId" value={bookingData.userId} onChange={handleChange} required>
                    <option value="">Select Tourist</option>
                    {Array.isArray(users) && users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>

                <select name="tourId" value={bookingData.tourId} onChange={handleChange} required>
                    <option value="">Select Tour</option>
                    {Array.isArray(tours) && tours.map(tour => (
                        <option key={tour.id} value={tour.id}>
                            {tour.name} - {tour.seats} seats left
                        </option>
                    ))}
                </select>

                <button type="submit">{editMode ? "Update Booking" : "Add Booking"}</button>
            </form>

            <h2>Existing Bookings</h2>
            <ul className="Grid small">
                {Array.isArray(bookings) && bookings.map(booking => (
                    <li key={booking.id}>
                        <h3>{booking.tourName}</h3>
                        <p>Booked by: {booking.username}</p>
                        <p>Price: ${booking.price}</p>
                        <div className="buttons">
                            <button onClick={() => handleEditBooking(booking)}>Edit</button>
                            <button onClick={() => handleDeleteBooking(booking.id, booking.tourId)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageBookings;
