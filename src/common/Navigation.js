import React from "react";
import {NavigationLink} from "../components/NavigationLink";

export const Navigation = ({open, toggleMenu,closeMenu}) => {
    let activeClassName = "active";

    return (
        <>
            <button
                className="hamburger"
                onClick={() => {
                    toggleMenu()
                }}
            >
                {open && <i className="fa-solid fa-xmark"></i>}
                {!open && <i className="fa-solid fa-bars"></i>}
            </button>

            <div className={open ? "nav mobile-open" : "nav"}>
            <ul id="nav">
                <li><NavigationLink to="/" state={{ scrollToTop: true }} title="Overview"
                                    className={({ isActive }) => isActive ? activeClassName : undefined}
                                    onClick={() => closeMenu()}>Overview</NavigationLink></li>
                <li><NavigationLink to="/ecosystem" state={{ scrollToTop: true }} title="Ecosystem"
                                    className={({ isActive }) => isActive ? activeClassName : undefined}
                                    onClick={() => closeMenu()}>Ecosystem</NavigationLink></li>
                <li><NavigationLink to="/markets" state={{ scrollToTop: true }} title="Markets"
                                    className={({ isActive }) => isActive ? activeClassName : undefined}
                                    onClick={() => closeMenu()}>Markets</NavigationLink></li>
                <li><NavigationLink to="/assets" state={{ scrollToTop: true }} title="Assets"
                                    className={({ isActive }) => isActive ? activeClassName : undefined}
                                    onClick={() => closeMenu()}>Assets</NavigationLink></li>
                <li><NavigationLink to="/trades" state={{ scrollToTop: true }} title="Trades"
                                    className={({ isActive }) => isActive ? activeClassName : undefined}
                                    onClick={() => closeMenu()}>Trades</NavigationLink></li>
            </ul></div>
            <div className="clear"></div>
        </>
    );
};