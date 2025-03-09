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
        fetch("http://localhost:5500/bookings")
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error("Error fetching bookings:", error));

        fetch("http://localhost:5500/users")
            .then(response => response.json())
            .then(data => setUsers(data.filter(user => user.role === "tourist")))
            .catch(error => console.error("Error fetching users:", error));

        fetch("http://localhost:5500/tours")
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error("Error fetching tours:", error));
    }, []);

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleAddBooking = (e) => {
        e.preventDefault();

        const selectedUser = users.find(user => user.id === bookingData.userId);
        const selectedTour = tours.find(tour => tour.id === bookingData.tourId);

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
        };

        fetch("http://localhost:5500/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBooking),
        })
            .then(response => response.json())
            .then(() => {
                fetch(`http://localhost:5500/tours/${selectedTour.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ seats: selectedTour.seats - 1 }),
                });
                setBookings([...bookings, newBooking]);
                setBookingData({ userId: "", tourId: "" });
            })
            .catch(error => console.error("Error adding booking:", error));
    };

    const handleEditBooking = (booking) => {
        setEditMode(true);
        setEditBookingId(booking.id);
        setBookingData({ userId: booking.userId, tourId: booking.tourId });
    };

    const handleUpdateBooking = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5500/bookings/${editBookingId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
        })
            .then(() => {
                setBookings(bookings.map(booking => 
                    booking.id === editBookingId ? { ...booking, ...bookingData } : booking
                ));
                setEditMode(false);
                setEditBookingId(null);
                setBookingData({ userId: "", tourId: "" });
            })
            .catch(error => console.error("Error updating booking:", error));
    };

    const handleDeleteBooking = (bookingId, tourId) => {
        fetch(`http://localhost:5500/bookings/${bookingId}`, { method: "DELETE" })
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
            .catch(error => console.error("Error deleting booking:", error));
    };

    return (
        <div>
            <h1>Manage Bookings</h1>

            <form onSubmit={editMode ? handleUpdateBooking : handleAddBooking}>
                <select name="userId" value={bookingData.userId} onChange={handleChange} required>
                    <option value="">Select Tourist</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>

                <select name="tourId" value={bookingData.tourId} onChange={handleChange} required>
                    <option value="">Select Tour</option>
                    {tours.map((tour) => (
                        <option key={tour.id} value={tour.id}>{tour.name} - {tour.seats} seats left</option>
                    ))}
                </select>

                <button type="submit">{editMode ? "Update Booking" : "Add Booking"}</button>
            </form>

            <h2>Existing Bookings</h2>
            <ul>
                {bookings.map((booking) => (
                    <li key={booking.id}>
                        <h3>{booking.tourName}</h3>
                        <p>Booked by: {booking.username}</p>
                        <p>Price: ${booking.price}</p>
                        <button onClick={() => handleEditBooking(booking)}>Edit</button>
                        <button onClick={() => handleDeleteBooking(booking.id, booking.tourId)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageBookings;
