import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import backendApi from '../APIs/API.js';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {

    const [ok, setOk] = useState(null);

    const checkAuth = async () => {
        try {
            const res = await backendApi.get('/auth/me');
            if (res.status === 200) {
                setOk(true);
            }
        }
        catch (error) {
            console.log(error.message);
            setOk(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);


    if (ok === null) return <p>checking authenticity</p>

    if (ok) return < Navigate to='/home' replace />;

    if (!ok) return <Outlet />


};




export default PublicRoutes