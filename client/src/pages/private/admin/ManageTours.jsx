import { useEffect, useState } from "react";
import TourForm from "../../../components/TourForm";

function ManageTours() {
    const [tours, setTours] = useState([]);
    const [tourData, setTourData] = useState({
        name: "",
        category: "",
        price: "",
        duration: "",
        seats: "",
        description: "",
        imageUrl: "",
        location: "",
        agencyId: 0 // You can allow admin to select this in the future
    });
    const [editMode, setEditMode] = useState(false);
    const [editTourId, setEditTourId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5055/api/tours")
            .then((response) => {
                if (!response.ok) throw new Error("Invalid response");
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setTours(data);
                } else {
                    console.error("Expected array but got:", data);
                    setTours([]);
                }
            })
            .catch((error) => console.error("Error fetching tours:", error));
    }, []);

    const handleChange = (e) => {
        setTourData({ ...tourData, [e.target.name]: e.target.value });
    };

    const handleAddTour = (e) => {
        e.preventDefault();
        const payload = {
            ...tourData,
            price: parseFloat(tourData.price),
            duration: parseInt(tourData.duration),
            seats: parseInt(tourData.seats),
        };

        fetch("http://localhost:5055/api/tours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then((res) => res.json())
            .then((newTour) => {
                setTours([...tours, newTour]);
                resetForm();
            })
            .catch((err) => console.error("Error adding tour:", err));
    };

    const handleEditTour = (tour) => {
        setEditMode(true);
        setEditTourId(tour.id);
        setTourData(tour);
    };

    const handleUpdateTour = (e) => {
        e.preventDefault();
        const payload = {
            ...tourData,
            price: parseFloat(tourData.price),
            duration: parseInt(tourData.duration),
            seats: parseInt(tourData.seats),
        };

        fetch(`http://localhost:5055/api/tours/${editTourId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(() => {
                setTours(
                    tours.map((tour) =>
                        tour.id === editTourId ? { ...tour, ...tourData } : tour
                    )
                );
                setEditMode(false);
                setEditTourId(null);
                resetForm();
            })
            .catch((error) => console.error("Error updating tour:", error));
    };

    const handleDeleteTour = (id) => {
        fetch(`http://localhost:5055/api/tours/${id}`, { method: "DELETE" })
            .then(() => setTours(tours.filter((t) => t.id !== id)))
            .catch((err) => console.error("Error deleting tour:", err));
    };

    const resetForm = () => {
        setTourData({
            name: "",
            category: "",
            price: "",
            duration: "",
            seats: "",
            description: "",
            imageUrl: "",
            location: "",
            agencyId: 0,
        });
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Tours</h1>

            <TourForm
                tourData={tourData}
                handleChange={handleChange}
                handleSubmit={editMode ? handleUpdateTour : handleAddTour}
                editMode={editMode}
            />

            <h2>Existing Tours</h2>
            <ul className="Grid small">
                {tours.map((tour) => (
                    <li key={tour.id}>
                        <h3>{tour.name}</h3>
                        <p>Category: {tour.category}</p>
                        <p>Location: {tour.location}</p>
                        <p>Price: ${tour.price}</p>
                        <p>Agency ID: {tour.agencyId}</p>
                        <div className="buttons">
                            <button onClick={() => handleEditTour(tour)}>Edit</button>
                            <button onClick={() => handleDeleteTour(tour.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageTours;
