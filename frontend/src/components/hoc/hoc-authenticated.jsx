import React, { useEffect, useRef, useState } from "react";
import { fetchUser } from "../../utils/data";
import { useNavigate } from "react-router-dom";

const HocAuthenticated = ({ component: Component, ...props }) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const mounted = useRef(false); //checking to see whether we did check the user

    useEffect(() => {
        if (!mounted.current) {
            setTimeout(() => mounted.current = true);
        }
        setUser(fetchUser());
    }, []);

    useEffect(() => {
        if (!user && mounted.current) {
            navigate?.("/login");
        }
    }, [user, navigate, mounted]);
    return user ? <Component {...props}></Component> : false; //if user is not connected we show nothing until we redirect to /login
}

export default HocAuthenticated;