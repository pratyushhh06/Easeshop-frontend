import {useState,useEffect} from 'react';

import { useAuth } from '../../Context/auth';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios'

export default function PrivateRoute() {
    const[ok,setOk] = useState(false);
    const[auth,setAuth] = useAuth();
    
    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get('http://localhost:5000/api/v1/auth/user-auth', {
                headers : {
                    "Authorization" : auth?.token
                }
            })
            if(res.data.ok){
                console.log(res);
                setOk(true);
            } else{
                setOk(false);
            }
        }
        if(auth?.token) authCheck()

    },[auth])
    return ok? <Outlet/> : <Spinner/>
}

