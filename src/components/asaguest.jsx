import { useState, useEffect } from "react";
import { getEvents } from "./home";
import { google } from "calendar-link";

function AsAGuest() {
  const [eventsInfo, setEventsInfo] = useState();

  useEffect(() => {
    updateEvents();
  }, []);

  function updateEvents() {
    getEvents().then((data) => {
      setEventsInfo(data);
    });
  }

  if (!eventsInfo || !eventsInfo.events) {
    return <div>Loading</div>;
  }

  function formatEventForGoogle(event) {
    const startDateTime = new Date(event.date);
    const [hours, minutes] = event.time.split(":");
    startDateTime.setHours(hours, minutes);

    return {
      title: event.title,
      start: startDateTime.toISOString(),
      duration: [event.duration, "hour"], 
      location: event.location,
      description: `Price: ${event.price}`,
    };
  }


  const googleUrls = eventsInfo.events.map((event) => {
    const gEvent = formatEventForGoogle(event);
    return google(gEvent);
  });

  return (
 <div className="events-container">
      {eventsInfo.events.map((e, i) => (
        <main className="event-card" key={e._id}>
          <div className="event-title">{e.title}</div>
          <div className="event-date">Date: {new Date(e.date).toDateString()}</div>
          <div className="event-time">Time: {e.time}</div>
          <div className="event-location">Location: {e.location}</div>
          <div className="event-price">Price: £{e.price}</div>
          <div className="event-duration">Duration: {e.duration} hours</div>
          <a
            href={googleUrls[i]}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-link"
          >
            Add to Calendar
          </a>
        </main>
      ))}
    </div>
  );
}

export default AsAGuest;