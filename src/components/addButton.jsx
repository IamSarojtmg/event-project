import { useState } from "react";
import { Link } from "react-router-dom";
import AddingImg from "./addImg";

const postLink = process.env.REACT_APP_API_URL;

function AddButton() {
  const categories = ["Sports", "Music", "Business", "Others"];

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [tags, setTags] = useState("");
  // const [url, setUrl] = useState("")

  const dropDownHandler = (e) => {
    const selectedTag = e.target.value;
    console.log("Selected tag:", selectedTag); // Debugging

    setTags(e.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      date,
      time,
      location,
      duration: parseInt(duration),
      price: parseFloat(price),
      tags: String(tags),
      // url,
    };
    // console.log("submiting event", product);

    try {
      const response = await fetch(`${postLink}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });



      if (response.ok) {
        const data = await response.json();
        // console.log("Server response", data); // Debugging
        // console.log("inside response"); //not going in here

        setSuccessMessage("Event added successfully!"); // Set success message
        setTitle("");
        setLocation("");
        setDuration(0);
        setDate("");
        setTime("");
        setPrice("");
        setTags("");
        // setUrl("")
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
        <Link className="add-event-link" to="/home">
          Go back
        </Link>

        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form onSubmit={handleSubmit} id="form-cont">
          <AddingImg />
          <label className="text">
            Title
            <input
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minLength={3}
              required
            />
          </label>
          <label className="text">
            Date
            <input
              className="input"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="text">
            Time
            <input
              className="input"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </label>
          <label className="text">
            Location
            <input
              className="input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label className="text">
            Duration
            <input
              className="input"
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
            <input
              className="input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              required
            />
          </label>
          {/* <input type="file" /> */}
          <div>
            Event Type
            <select value={tags || ""} onChange={dropDownHandler} required>
              <option value="">Choose a type</option>
              {categories.map((tags, i) => {
                return (
                  <option key={i} value={tags}>
                    {tags}
                  </option>
                );
              })}
            </select>
          </div>

          <button className="add-btn" type="submit">
            Add Event
          </button>
        </form>
      </div>
    </>
  );
}

export default AddButton;
