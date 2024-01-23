import React, {useEffect, useRef, useState} from 'react';

export function FadeInSection(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const current = domRef.current;
        if (!current) return;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(entry.isIntersecting);
                }
            });
        });
        observer.observe(current);
        return () => observer.unobserve(current);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${props.className}`}
            ref={domRef}
            style={props.style}
        >
            {props.children}
        </div>
    );
}