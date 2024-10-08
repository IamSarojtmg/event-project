import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/index";
import { Link } from "react-router-dom";

export const getEvents = async () => {
  const res = await fetch(
    "https://heroku-api-two-68fd319974e4.herokuapp.com/events"
  );
  const data = await res.json();
  return data;
};

const Home = () => {
  const { currentUser } = useAuth();
  const [eventsInfo, setEventsInfo] = useState();

  useEffect(() => {
    updateEvents();
  }, []);

  function updateEvents() {
    getEvents().then((data) => {
      setEventsInfo(data);
    });
  }
  
  const deleteEvent = async (id) => {
    try {
      await fetch(`https://heroku-api-two-68fd319974e4.herokuapp.com/events/${id}`, {
        method: "DELETE",
      }).then(() => {
        updateEvents();
      });
    } catch (error) {
      console.error("fail", error);
    }
  };
  
  if (!eventsInfo || !eventsInfo.events) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <Link to="/adduser">Add Event</Link>
      <div>
        {eventsInfo.events.map((e) => (
          <main id="event-cont" key={e._id}>
            <div>title - {e.title}</div>
            <div>Date - {e.date.substring(0,10)}</div>
            <div>time -{e.time}</div>
            <div>location -{e.location}</div>
            <div>Price £{e.price}</div>
            <div>Duration {e.duration} hours</div>
            <button onClick={() => deleteEvent(e._id)}>Delete</button>
          </main>
        ))}
      </div>
    </>
  );
};

export default Home;
