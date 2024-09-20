import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/index";
import AddButton from "../addButton";
import DisplayEvents from "../displayEvents";

const Home = () => {
  const { currentUser } = useAuth();
  const [eventsInfo, setEventsInfo] = useState();
  useEffect(() => {
    const fetchMongoDbData = async () => {
      const res = await fetch("http://localhost:3001/products");
      const data = await res.json();
      setEventsInfo(data)
    };
    fetchMongoDbData();
  }, []);
 
  return (
    <>
      <div>
        Hello{" "}
        {currentUser.displayName ? currentUser.displayName : currentUser.email},
        you are now logged in.
      </div>
      <AddButton />
      <DisplayEvents eventsInfo={eventsInfo}/>
    </>
  );
};

export default Home;
