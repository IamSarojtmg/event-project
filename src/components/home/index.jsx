import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/index";
import { Link } from "react-router-dom";
import Header from "../header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faVolleyball, faBriefcase, faTicket } from "@fortawesome/free-solid-svg-icons";

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
      await fetch(
        `https://heroku-api-two-68fd319974e4.herokuapp.com/events/${id}`,
        {
          method: "DELETE",
        }
      ).then(() => {
        updateEvents();
      });
    } catch (error) {
      console.error("fail", error);
    }
  };

  if (!eventsInfo || !eventsInfo.events) {
    return <div>Loading</div>;
  }
  console.log(eventsInfo);

  return (
    <>
      <div className="home-container">
        <Header />
        <nav className="tags-cont">
          <FontAwesomeIcon icon={faMusic} />
          <FontAwesomeIcon icon={faVolleyball} />
          
          <FontAwesomeIcon icon={faBriefcase} />
          <FontAwesomeIcon icon={faTicket} />
        </nav>

        <Link className="add-event-link" to="/addevent">
          Add Event
        </Link>
        <div className="events-container">
          {eventsInfo.events.map((e) => (
            <main className="event-card" key={e._id}>
              <div className="event-title">{e.title}</div>
              <div className="event-date">Date: {e.date.substring(0, 10)}</div>
              <div className="event-time">Time: {e.time}</div>
              <div className="event-location">Location: {e.location}</div>
              <div className="event-price">Price: £{e.price}</div>
              <div className="event-duration">Duration: {e.duration} hours</div>
              <div>Tags: {e.tags}</div>
              <img src={e.urlFromChild} alt="the ticket info" />
              <button
                className="delete-button"
                onClick={() => deleteEvent(e._id)}
              >
                Delete
              </button>
            </main>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
