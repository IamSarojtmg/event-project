import { useState,useEffect } from "react";
import { getEvents } from "./home";

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

  return <>
        <div>
        {eventsInfo.products.map((e) => (
          <main id="event-cont" key={e._id}>
            <div>{e.title}</div>
            <div>{e.date}</div>
            <div>{e.time}</div>
            <div>{e.location}</div>
            <div>{e.price}</div>
          </main>
        ))}
      </div>
  </>
}

export default AsAGuest;
