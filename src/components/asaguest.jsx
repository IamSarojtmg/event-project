import { useState,useEffect } from "react";
import { getEvents } from "./home";
import { google } from "calendar-link";


function AsAGuest(params) {
  const [eventsInfo, setEventsInfo] = useState();

  useEffect(() => {
    updateEvents();
  }, []);

  function updateEvents() {
    getEvents().then((data) => {
      setEventsInfo(data);
    });
  }

  
  
  if (!eventsInfo || !eventsInfo.products) {
    return <div>Loading</div>;
  }

  //add them in an object
  //run them in order
  let gEvents = {};

  eventsInfo.products.forEach((e, index) => {
    gEvents[`event_${index}`] = {
      title: e.title,
      duration: [e.duration,'h'],
      location: e.location,
    };
  });
  console.log(gEvents);
  

  const googleUrl = google(gEvents)
  console.log(googleUrl);
  
  


  
  return <>
        <div>
        {eventsInfo.products.map((e) => (
          <main id="event-cont" key={e._id}>
            <div>Title - {e.title}</div>
            <div>Date - {e.date}</div>
            <div>Time - {e.time}</div>
            <div>Location - {e.location}</div>
            <div>Price - {e.price}</div>
            <div>Duration - {e.duration}</div>
          </main>
        ))}
      </div>
  </>
}

export default AsAGuest;
