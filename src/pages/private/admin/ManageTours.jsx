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
  });
  const [editMode, setEditMode] = useState(false);
  const [editTourId, setEditTourId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5500/tours")
      .then((response) => response.json())
      .then((data) => setTours(data))
      .catch((error) => console.error("Error fetching tours:", error));
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
      .then((response) => response.json())
      .then((newTour) => {
        setTours([...tours, newTour]);
        resetForm();
      })
      .catch((error) => console.error("Error adding tour:", error));
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
        setTours(
          tours.map((tour) => (tour.id === editTourId ? { ...tour, ...tourData } : tour))
        );
        setEditMode(false);
        setEditTourId(null);
        resetForm();
      })
      .catch((error) => console.error("Error updating tour:", error));
  };

  const handleDeleteTour = (tourId) => {
    fetch(`http://localhost:5500/tours/${tourId}`, { method: "DELETE" })
      .then(() => setTours(tours.filter((tour) => tour.id !== tourId)))
      .catch((error) => console.error("Error deleting tour:", error));
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
            <p>Category: {tour.category} - Price: ${tour.price}</p>
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
