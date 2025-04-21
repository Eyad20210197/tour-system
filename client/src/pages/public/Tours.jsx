import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchFilter from "../../components/SearchFilter";
import { getTours } from "../../api/api";
function Tours() {
  const [tours, setTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

    useEffect(() => {
        getTours("approved")
            .then(response => setTours(response.data))
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
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />

      {/* Tour List */}
      <div className="tours">
        {filteredTours.length === 0 ? (
          <p className="message">No tours match your search.</p>
        ) : (
          filteredTours.map((tour) => (
            <div key={tour.id} className="tour-item item">
              {tour.imageUrl && (
               <img src={`/images/${tour.imageUrl}`} alt={tour.name} />

              )}
              <h3>{tour?.name || "No Name Available"}</h3>
              <p><strong>Category:</strong> {tour?.category || "N/A"}</p>
              <p><strong>Price:</strong> ${tour?.price || "N/A"}</p>
              <p><strong>Duration:</strong> {tour?.duration || "N/A"}</p>
              <p><strong>Seats Available:</strong> {tour?.seats || "N/A"}</p>
              <Link to={`/tours/${tour.id}`}>View Details</Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Tours;