import React from 'react';

const Column = ({ children, className, fixedSize, smBreakpoint, mdBreakpoint, lgBreakpoint, xlBreakpoint }) => {
    const getColumnClassName = () => {
        let breakPointString = '';
        if(fixedSize)
            breakPointString += `col-${fixedSize} `;
        
        if(smBreakpoint) 
            breakPointString += `col-sm-${ smBreakpoint } `;
        if(mdBreakpoint) 
            breakPointString += `col-md-${ mdBreakpoint } `;
        if(lgBreakpoint)
            breakPointString += `col-lg-${ lgBreakpoint } `;
        if(xlBreakpoint)
            breakPointString += `col-xl-${ xlBreakpoint } `;

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