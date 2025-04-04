import { useEffect, useState } from "react";

function ManageTours() {
    const [tours, setTours] = useState([]);
    const [tourData, setTourData] = useState({
        name: "",
        category: "",
        price: "",
        duration: "",
        seats: "",
        description: "",
    });
    const [editMode, setEditMode] = useState(false);
    const [editTourId, setEditTourId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5500/tours")
            .then(response => response.json())
            .then(data => setTours(data))
            .catch(error => console.error("Error fetching tours:", error));
    }, []);

    const handleChange = (e) => {
        setTourData({ ...tourData, [e.target.name]: e.target.value });
    };

    const handleAddTour = (e) => {
        e.preventDefault();

        fetch("http://localhost:5500/tours", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tourData),
        })
            .then(response => response.json())
            .then(newTour => {
                setTours([...tours, newTour]);
                setTourData({ name: "", category: "", price: "", duration: "", seats: "", description: "" });
            })
            .catch(error => console.error("Error adding tour:", error));
    };

    const handleEditTour = (tour) => {
        setEditMode(true);
        setEditTourId(tour.id);
        setTourData(tour);
    };

    const handleUpdateTour = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5500/tours/${editTourId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tourData),
        })
            .then(() => {
                setTours(tours.map(tour => (tour.id === editTourId ? { ...tour, ...tourData } : tour)));
                setEditMode(false);
                setEditTourId(null);
                setTourData({ name: "", category: "", price: "", duration: "", seats: "", description: "" });
            })
            .catch(error => console.error("Error updating tour:", error));
    };

    const handleDeleteTour = (tourId) => {
        fetch(`http://localhost:5500/tours/${tourId}`, { method: "DELETE" })
            .then(() => setTours(tours.filter(tour => tour.id !== tourId)))
            .catch(error => console.error("Error deleting tour:", error));
    };

    return (
        <div className="FunctionalComponent">
            <h1>Manage Tours</h1>
            
            <form onSubmit={editMode ? handleUpdateTour : handleAddTour}>
                <input type="text" name="name" placeholder="Tour Name" value={tourData.name} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Category" value={tourData.category} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={tourData.price} onChange={handleChange} required />
                <input type="text" name="duration" placeholder="Duration" value={tourData.duration} onChange={handleChange} required />
                <input type="number" name="seats" placeholder="Seats Available" value={tourData.seats} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={tourData.description} onChange={handleChange} required></textarea>
                
                <button type="submit">{editMode ? "Update Tour" : "Add Tour"}</button>
            </form>

            <h2>Existing Tours</h2>
            <ul>
                {tours.map((tour) => (
                    <li key={tour.id}>
                        <h3>{tour.name}</h3>
                        <p>Category: {tour.category} - Price: ${tour.price}</p>
                        <button onClick={() => handleEditTour(tour)}>Edit</button>
                        <button onClick={() => handleDeleteTour(tour.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ManageTours;
