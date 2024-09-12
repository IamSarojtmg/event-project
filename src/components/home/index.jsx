import React from 'react'
import { useAuth } from '../../contexts/index'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div >Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
    )
}

export default Home