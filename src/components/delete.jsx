function DeleteEvent(eventsInfo){
eventsInfo.event.products.map(e=>{
    console.log(e.title);
    
})

const handleDelete = async(id)=>{
    try{
        await fetch(`http://localhost:3001/products/${id}`,{
            method:'DELETE'
        })
    }catch(error){
        console.error('fail', error)
    }
}

    return(
        <div>
            {eventsInfo.event.products.map(e=>(
                <main id="event-cont" key={e._id}>
                    <div>{e.title}</div>
                    <div>{e.date}</div>
                    <div>{e._id}</div>
                    <button onClick={()=>handleDelete(e._id)}>Delete</button>
                </main>
            ))}
        </div>
    )
}

export default DeleteEvent