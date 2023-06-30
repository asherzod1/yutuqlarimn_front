import React, {useEffect, useState} from 'react';
import {TOKEN_ACCESS} from "../api/host";
import {Navigate, Outlet, useNavigate} from "react-router-dom";
// import {getUserMe} from "../api/config/user";

function PrivateRouter(props) {
    const token = localStorage.getItem(TOKEN_ACCESS)
    const [user, setUser] = useState(null)
    // useEffect(()=>{
    //     if(token){
    //         getUserMe().then((res)=>{
    //             setUser(res.data)
    //         })
    //     }
    // },[])
    return (
        <div>
            {
                token ? <Outlet context={user}/> : <Navigate to={"/login"} />
            }
        </div>
    );
}

export default PrivateRouter;
