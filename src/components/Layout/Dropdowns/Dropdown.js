import React from 'react';

const Dropdown = ({ children, className, togglerText }) => (
    <div 
        className = { className || 'mb-3'}
    >
        <div className='px-2 py-2 cursor-click' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            { togglerText }
        </div>
        <div className='dropdown-menu'>
            { children }
        </div>
    </div>
);

export default Dropdown;