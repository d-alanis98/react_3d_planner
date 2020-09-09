import React from 'react';
//Constants
import { TOP, FRONT } from '../../../../../../constants/models/models';

const CurrentViewLabel = ({ editorView }) => {
    const getViewName = () => {
        const TOP_NAME = 'Superior';
        const FRONT_NAME = 'Frontal';
        switch(editorView) {
            case TOP:
                return TOP_NAME;
            case FRONT:
                return FRONT_NAME;
            default:
                return TOP_NAME;
        }
    }
    return (
        <span>
            <strong>Vista: </strong>
            { getViewName() }
        </span> 
    );
}

export default CurrentViewLabel;