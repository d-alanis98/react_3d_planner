import React, { useRef, useEffect } from 'react';
//Styles
import '../Styles/Animations.css';

const withAnimation = displayPropertyName => WrappedComponent => {
    const WithAnimation = props => {

        const displayComponent = props[displayPropertyName];

        const container = useRef();

        useEffect(() => {
            if(displayComponent) {
                container.current.classList.remove('animation__container--unmounted');
                container.current.classList.add('animation__container--mounted');
            }
            else {
                container.current.classList.remove('animation__container--mounted');
                container.current.classList.add('animation__container--unmounted');
            }
        }, [displayComponent]);

        return (
            <div
                ref = { container }
                className = 'animation__container animation__container--unmounted'
            >
                <WrappedComponent 
                    { ...props }
                />
            </div>
        );
    }

    return WithAnimation;
}

export default withAnimation;