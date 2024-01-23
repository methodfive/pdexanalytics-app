import {useState} from "react";

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        if(document == null || document.documentElement == null)
            return;

        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        }
        else if (scrolled <= 300){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        if(typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    if(typeof window !== "undefined")
        window.addEventListener('scroll', toggleVisible);

    return (
        <button title="Back to top" className="scrollToTop text-center" onClick={scrollToTop}
                style={{display: visible ? 'inline' : 'none'}}
        >
            <i className="fa-solid fa-arrow-up"></i>
        </button>
    );
}