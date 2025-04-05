import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Tours() {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    fetch("http://localhost:5500/tours")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched Tours:", data);
        setTours(data);
      })
      .catch(error => console.error("Error fetching tours:", error));
  }, []);

  const filteredTours = tours.filter((tour) =>
    tour.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter ? tour.category === categoryFilter : true) &&
    (priceFilter ? tour.price <= parseFloat(priceFilter) : true)
  );

  return (
    <div className="tour-list">
      <h1>Available Tours</h1>

      {/* Filters */}
      <div style={{ marginBottom: "20px" }} className="search">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Adventure">Adventure</option>
          <option value="Historical">Historical</option>
          <option value="Relaxation">Relaxation</option>
        </select>
      </div>

      {/* Tour List */}
      <div className="tours">
        {filteredTours.length === 0 ? (
          <p>No tours match your search.</p>
        ) : (
          filteredTours.map((tour) => (
            <div key={tour.id} className="tour-item">
              {tour.imageUrl && (
                <img src={tour.imageUrl} alt={tour.name} />
              )}
              <h3>{tour?.name || "No Name Available"}</h3>
              <p><strong>Category:</strong> {tour?.category || "N/A"}</p>
              <p><strong>Price:</strong> ${tour?.price || "N/A"}</p>
              <p><strong>Duration:</strong> {tour?.duration || "N/A"}</p>
              <p><strong>Seats Available:</strong> {tour?.seats || "N/A"}</p>
              <p><strong>Description:</strong> {tour?.description || "N/A"}</p>
              <Link to={`/tours/${tour.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Tours;