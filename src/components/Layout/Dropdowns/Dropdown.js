import React from 'react';

const Dropdown = ({ children, className, togglerText, noPadding, togglerClassName }) => (
    <div 
        className = { className || 'mb-3'}
    >
        <div 
            className = { `${ noPadding ? '' : 'p-2' } w-100 cursor-click ${ togglerClassName || ''}` } 
            data-toggle = 'dropdown' 
            aria-haspopup = 'true' 
            aria-expanded = 'false'
        >
            { togglerText }
        </div>
        <div className='dropdown-menu p-0'>
            { children }
        </div>
    </div>
);

export default Dropdown;