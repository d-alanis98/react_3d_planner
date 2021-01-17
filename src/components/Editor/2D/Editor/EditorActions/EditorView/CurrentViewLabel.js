import React from 'react';
//Constants
import { TOP, FRONT, FRONT_RIGHT } from '../../../../../../constants/models/models';

const CurrentViewLabel = ({ editorView }) => {
    const getViewName = () => {
        const TOP_NAME = 'Superior';
        const FRONT_NAME = 'Frontal';
        const LATERAL_NAME = 'Lateral';
        switch(editorView) {
            case TOP:
                return TOP_NAME;
            case FRONT:
                return FRONT_NAME;
            case FRONT_RIGHT:
                return LATERAL_NAME;
            default:
                return TOP_NAME;
        }
    }
    return (
        <div className='d-flex flex-row align-items-center text--medium h-100'>
            <strong className='mr-1'>Vista: </strong>
            { getViewName() }
        </div> 
    );
}

export default CurrentViewLabel;