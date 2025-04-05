import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import TourForm from "../../../components/TourForm";

export default function TourPackages() {
  const { user } = useContext(AuthContext); // Get logged-in agency
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
    if (user && user.id) {
      fetch(`http://localhost:5500/tours?agencyId=${user.id}`)
        .then((response) => response.json())
        .then((data) => setTours(data))
        .catch((error) => console.error("Error fetching tours:", error));
    }
  }, [user]);

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleAddTour = (e) => {
    e.preventDefault();
    const newTour = { ...tourData, agencyId: user.id }; // attach agency ID

    fetch("http://localhost:5500/tours", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTour),
    })
      .then((response) => response.json())
      .then((createdTour) => {
        setTours([...tours, createdTour]);
        setTourData({ name: "", category: "", price: "", duration: "", seats: "", description: "" });
      })
      .catch((error) => console.error("Error adding tour:", error));
  };

  const handleEditTour = (tour) => {
    setEditMode(true);
    setEditTourId(tour.id);
    setTourData({ ...tour });
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
        setTourData({ name: "", category: "", price: "", duration: "", seats: "", description: "" });
      })
      .catch((error) => console.error("Error updating tour:", error));
  };

  const handleDeleteTour = (tourId) => {
    fetch(`http://localhost:5500/tours/${tourId}`, {
      method: "DELETE",
    })
      .then(() => setTours(tours.filter((tour) => tour.id !== tourId)))
      .catch((error) => console.error("Error deleting tour:", error));
  };

  return (
    <div className="FunctionalComponent">
      <h1>Manage Your Tour Packages</h1>

      <TourForm
        tourData={tourData}
        handleChange={handleChange}
        handleSubmit={editMode ? handleUpdateTour : handleAddTour}
        editMode={editMode}
      />


      <h2>Your Tours</h2>
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