import { useState } from "react";

function AddButton() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      date,
      time,
      location,
      price: parseFloat(price),
    };

    try {
      const response = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("event added", data);
      } else {
        console.log("failed to add the event");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Hi</div>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          ></input>
        </label>
        <label>
          time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          ></input>
        </label>
        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          ></input>
        </label>
        <button type="submit">Add Event</button>
      </form>
    </>
  );
}

export default AddButton;
