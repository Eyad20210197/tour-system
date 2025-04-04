import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function Complaints() {
  const { user } = useContext(AuthContext);
  const [complaints, setComplaints] = useState([]);
  const [text, setText] = useState("");

  // Fetch user's complaints
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5500/complaints?userId=${user.id}`)
        .then(res => res.json())
        .then(data => setComplaints(data))
        .catch(err => console.error("Error fetching complaints:", err));
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newComplaint = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      message: text,
      status: "pending",
      response: ""
    };

    fetch("http://localhost:5500/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComplaint),
    })
      .then(res => res.json())
      .then(data => {
        setComplaints([...complaints, data]);
        setText(""); // Clear input
      })
      .catch(err => console.error("Error submitting complaint:", err));
  };

  return (
    <div className="dashboard">
      <h1>Submit a Complaint</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your complaint here..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Your Complaints</h2>
      <ul>
        {complaints.map((c) => (
          <li key={c.id}>
            <p><strong>Message:</strong> {c.message}</p>
            <p><strong>Status:</strong> {c.status}</p>
            {c.response && <p><strong>Admin Response:</strong> {c.response}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Complaints;
