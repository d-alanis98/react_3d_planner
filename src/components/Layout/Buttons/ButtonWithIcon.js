import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FlexRow from '../Flex/FlexRow';

let mouseEnterInterval;

const ButtonWithIcon = ({ icon, type, onClick, className, buttonText, onHoverText, iconClassName, ...extraProps }) => {
    //CONSTANTS
    const MOUSE_ENTER_TIME = 100;
    
    //HOOKS
    //State
    const [isShown, setIsShown] = useState(false);

    //Effects
    useEffect(() => 
        () => mouseEnterInterval && clearInterval(mouseEnterInterval)
    );

    const handleMouseEnter = event => {
        mouseEnterInterval = setInterval(() => setIsShown(true), MOUSE_ENTER_TIME);
    }

    const handleMouseLeave = event => {
        mouseEnterInterval && clearInterval(mouseEnterInterval);
        setIsShown(false);
    }

    return (
        <button
            onMouseEnter = { handleMouseEnter }
            onMouseLeave = { handleMouseLeave }
            onClick = { onClick }
            className = {`btn btn-${type} ${className || ''}`}
            { ...extraProps }
        >
            <FlexRow
                className = 'align-items-center'
            >
                <FontAwesomeIcon 
                    icon = { icon }
                    className = { iconClassName || 'mr-2' }
                />
                { buttonText }
                { isShown && onHoverText && <span className='ml-2'>{ onHoverText }</span> }
            </FlexRow>

        </button>
    );
}

export default ButtonWithIcon;