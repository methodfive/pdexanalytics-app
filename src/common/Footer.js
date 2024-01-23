import React from "react";
import ScrollToTopButton from "../components/ScrollToTopButton";

/* eslint react/jsx-no-target-blank: 0 */
export const Footer = () => {
    return (
        <footer className="mt-5">
            <div className="main-content">
                <div className="row">
                    <div className="col-9">
                        &copy; 2024 pdexanalytics.com
                    </div>
                    <div className="col-3 text-right d-none d-lg-block">
                        <div className="created-by">Analytics by <a href="https://method5.com" target="_blank">Method5</a></div>
                    </div>
                </div>
            </div>
            <ScrollToTopButton/>
        </footer>
    );
};
