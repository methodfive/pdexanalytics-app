import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AutomaticScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        if(typeof window !== "undefined" && document != null) {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            window.history.replaceState({}, document.title)
        }
    }, [pathname]);

    return null;
}