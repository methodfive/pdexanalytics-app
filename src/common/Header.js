import React,{useState} from "react";
import {Navigation} from "./Navigation";

export const Header = () => {
    const [open, setOpen] = useState(false);

    const toggleMobileMenu = () => {
        setOpen(!open);
    };

    const closeMobileMenu = () => {
        setOpen(false)
    }

    return (
        <header>
            <div className="main-content">
                <div className="logo">
                    <a href="/" title="Polkadex Analytics">
                        <img src="/images/logo.png" alt="Polkadex Analytics" style={{width:"123px", height: "50px"}}/>
                    </a>
                </div>
                <Navigation open={open} toggleMenu={toggleMobileMenu} closeMenu={closeMobileMenu} />
                <div className="clearfix"/>
            </div>
        </header>
    );
};
