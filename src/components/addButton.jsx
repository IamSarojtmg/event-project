import { useState } from "react";
import { Link } from "react-router-dom";

function AddButton() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      date,
      time,
      location,
      duration: parseInt(duration),
      price: parseFloat(price),
    };

    try {
      const response = await fetch("https://heroku-api-two-68fd319974e4.herokuapp.com/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Event added successfully!"); // Set success message
        setTitle("");
        setLocation("");
        setDuration(0);
        setDate("");
        setTime("");
        setPrice("");
      } else {
        setSuccessMessage(""); // Clear message if it fails
      }
    } catch (error) {
      setSuccessMessage(""); // Clear message on error
    }
  };



  return (
    <>
    <div className="main-cont">
      <h1>Event Details</h1>
      <Link className="add-event-link" to="/home">Go back</Link>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} 
      <form onSubmit={handleSubmit} id="form-cont">
        <label className="text">
          Title
          <input className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={3}
            required
            />
        </label>
        <label className="text">
          Date
          <input className="input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            />
        </label>
        <label className="text">
          Time
          <input className="input"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            />
        </label>
        <label className="text">
          Location
          <input className="input"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            />
        </label>
        <label className="text">
          Duration
          <input className="input"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            max="12"
            required
            />
        </label>
        <label className="text">
          Price
          <input className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            required
            />
        </label>
        <label className="tags">
          <input type="text" />
        </label>
        <button className="add-btn" type="submit">Add Event</button>
      </form>
            </div>
    </>
  );
}

export default AddButton;
