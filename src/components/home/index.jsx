import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/index'
import AddButton from '../addButton'

const Home = () => {
    const { currentUser } = useAuth()
useEffect(()=>{
    const fetchMongoDbData = async()=>{
        const res = await fetch('http://localhost:3001/products')
        const data = await res.json()
        console.log(data);
    }
    fetchMongoDbData();
},[])




    return (
        <>
        <div >Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
        <AddButton/>
        </>
    )
}

export default Home