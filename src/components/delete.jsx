// import { useState,useEffect } from "react";
// import { getEvents } from "./home";


// function DeleteEvent(eventsInfo){

//     const initialEvents = eventsInfo.event.products
//     const [eventInfo, setEventsInfo] = useState(initialEvents)
//     console.log(eventInfo);
    
//     useEffect(()=>{
//         setEventsInfo(initialEvents)
//     },[initialEvents])

// const handleDelete = async(id)=>{
//     try{
//         await fetch(`http://localhost:3001/products/${id}`,{
//             method:'DELETE'
//         })
//     }catch(error){
//         const updatedEvents = await getEvents()
//         setEventsInfo(updatedEvents)
//         console.error('fail', error)
//     }
// }
//     return(
//         <div>
//             {eventsInfo.event.products.map(e=>(
//                 <main id="event-cont" key={e._id}>
//                     <div>{e.title}</div>
//                     <div>{e.date}</div>
//                     <div>{e._id}</div>
//                     <button onClick={()=>handleDelete(e._id)}>Delete</button>
//                 </main>
//             ))}
//         </div>
//     )
// }

// export default DeleteEvent
//NOT USED