import React from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";

export const NavigationLink = ({...props}) => {
    const location = useLocation();
    const navigate = useNavigate();

    function conditionalClick(e)
    {
        e.preventDefault();
        if(location.pathname !== props.to)
        {
            navigate(props.to, { state: { scrollToTop: true } })
        }
        else if(location.pathname === props.to && typeof window !== "undefined" && window.pageYOffset !== 0)
        {
            window.scrollTo(0, 0);
        }

        if(props.onClick != null)
            props.onClick(e);
    }
    return (
        <NavLink {...props} onClick={conditionalClick}/>
    );
};
