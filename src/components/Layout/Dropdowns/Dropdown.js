import React from 'react';

const Dropdown = ({ children, className, togglerText, noPadding }) => (
    <div 
        className = { className || 'mb-3'}
    >
        <div className={ `${ noPadding ? '' : 'p-2' } cursor-click` } data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
            { togglerText }
        </div>
        <div className='dropdown-menu p-0'>
            { children }
        </div>
    </div>
);

export default Dropdown;