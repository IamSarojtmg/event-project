import React, { useContext, useEffect, useState } from "react";
import {auth} from '../firebase/firebase'
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext) //use context helps pass data without props, 
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null)
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true) //setting use states

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser) //using firebase auth and the 2nd arguement as the custom function
        return unsubscribe
    },[])

    async function initializeUser(user){
        if(user){
            setCurrentUser({...user});
            setUserLoggedIn(true)
        }else{
            setCurrentUser(null)
            setUserLoggedIn(false)
        }
        setLoading(false)
    }

    const value = { //using this as props as authcontext.provider
        currentUser,
        userLoggedIn,
        loading
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children} 
        </AuthContext.Provider>
    )
}// {!loading && children}  if loading is set false render the children(authprovider(children)) 