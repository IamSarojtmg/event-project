import { useState } from "react";

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
      <div>Hi</div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>} {/* Show success message */}
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            minLength={3}
            required
          />
        </label>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>
        <label>
          Duration
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            min="1"
            required
          />
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            required
          />
        </label>
        <button type="submit">Add Event</button>
      </form>
    </>
  );
}

export default AddButton;
