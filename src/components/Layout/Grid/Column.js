import React from 'react';

const Column = ({ children, className, fixedSize, smBreakpoint, mdBreakpoint, lgBreakpoint, xlBreakpoint }) => {
    const getColumnClassName = () => {
        if(fixedSize)
            return `col-${fixedSize}`;
        let breakPointString = '';
        if(xlBreakpoint)
            breakPointString += `col-xl-${ xlBreakpoint } `;
        if(lgBreakpoint)
            breakPointString += `col-lg-${ lgBreakpoint } `;
        if(mdBreakpoint) 
            breakPointString += `col-md-${ mdBreakpoint } `;
        if(smBreakpoint) 
            breakPointString += `col-sm-${ smBreakpoint } `;

        return breakPointString;
    }
    return (
        <div
            className = { `${ getColumnClassName() } ${ className || '' }` }
        >
            { children }
        </div>
    );
};

export default Column;