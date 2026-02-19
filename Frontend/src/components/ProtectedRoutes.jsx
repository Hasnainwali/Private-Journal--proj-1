import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import backendApi from '../APIs/API.js';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {

    const [ok, setOk] = useState(null);

    const gotoJournals = async()=> {
        
        try {
            const res = await backendApi.get('/getjournals');
            // console.log(res);


            if(res.status === 200){
                setOk(true)
            }
        } 
        catch (error) {
            console.log(error.message)
            setOk(false);
            
        }
    }

    useEffect(()=> {
    gotoJournals();
},[]);


if(ok === null) return <p>checking authenticity</p>
if(!ok) return < Navigate to= '/' />;
if(ok)  return <Outlet/>


};




export default ProtectedRoutes