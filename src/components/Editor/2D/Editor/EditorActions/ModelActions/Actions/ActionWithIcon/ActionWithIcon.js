import React from 'react';
//Components
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';
import CircularIcon from '../../../../../../../Layout/Icons/CircularIcon';
//Style
import './ActionWithIcon.css';

const ActionWithIcon = ({ 
    icon, 
    color,
    onClick, 
    className,
    actionText 
}) => {

    const defaultClassName = 'justify-content-around p-2 rounded-pill border cursor-click action-with-icon';
    const additionalClassName = className || '';
    const getColor = () => color || 'muted';

    return (
        <FlexRow
            onClick = { onClick }
            className = { `${defaultClassName} border-${getColor()} text-${getColor()} ${additionalClassName}`  }
        >
            <CircularIcon 
                icon = { icon }
                iconClassName = { `text-${getColor()}` }
            />
            <span>{ actionText }</span>
        </FlexRow>
    );
}

export default ActionWithIcon;