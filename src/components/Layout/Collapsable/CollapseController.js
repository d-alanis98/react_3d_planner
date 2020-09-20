import React, { useEffect, useState } from 'react';
import $ from 'jquery';
//Components
import LabelWithIcon from '../Labels/LabelWithIcon';
//Icons
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const CollapseController = ({ expanded, targetId, className, dropupIcon, dropdownIcon, ...extraProps }) => {
    const [collapsed, setCollapsed] = useState(!expanded);

    const handleCollapse = event => {
        event.stopPropagation();
        setCollapsed(!collapsed);
    }

    useEffect(() => {
        expanded &&
            $(`#${targetId}`).collapse('show')
    }, [expanded]);

    const getIcon = () => collapsed 
        ? dropdownIcon || faCaretDown
        : dropupIcon || faCaretUp;

    return (
        <LabelWithIcon 
            icon = { getIcon() }
            onClick = { handleCollapse }
            className = { className || 'text-muted cursor-click mb-0 mr-2' }
            data-target = { `#${targetId}` }
            data-toggle = 'collapse' 
            aria-expanded = { expanded ? 'true' : 'false' } 
            aria-controls = { targetId }
            { ...extraProps }
        />
    );
}

export default CollapseController;