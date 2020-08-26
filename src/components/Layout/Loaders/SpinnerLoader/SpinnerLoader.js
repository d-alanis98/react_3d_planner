import React, { Fragment } from 'react';
//CSS
import './SpinnerLoader.css';

const SpinnerLoader = ({ loading, className, loaderText }) => (
    loading ?
        <Fragment>
            <div 
                className = { `spinner-border spinner-loader-size ${ className || '' }` }
            >
                <span className='sr-only'>Loading...</span>
            </div>
            <h5>{ loaderText }</h5>
        </Fragment>
    :   null
);

export default SpinnerLoader;