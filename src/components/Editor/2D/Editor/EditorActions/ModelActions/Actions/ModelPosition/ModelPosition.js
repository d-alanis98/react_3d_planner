import React, { useEffect, useState } from 'react';
//Components
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';
import ActionWithInput from '../ActionWithInput/ActionWithInput';

const ModelPosition = ({ modelToEdit, handlePositionChange }) => {
    const [localX, setLocalX] = useState();
    const [localY, setLocalY] = useState();

    useEffect(() => {
        if(!modelToEdit || !modelToEdit.attrs) {
            setLocalX(undefined);
            setLocalY(undefined);
            return;
        }
        setLocalX(modelToEdit.attrs.x);
        setLocalY(modelToEdit.attrs.y);
    }, [modelToEdit]);

    useEffect(() => {
        if(!modelToEdit || !modelToEdit.attrs)
            return;
        setLocalX(modelToEdit.attrs.x);
        setLocalY(modelToEdit.attrs.y);
    })

    useEffect(() => {
        if(localX === undefined || localY === undefined)
            return;
        handlePositionChange(localX, localY);
    }, [localX, localY]);


    if(!modelToEdit || !modelToEdit.attrs)
        return null;

    return (
        <FlexRow
            className = 'align-items-center justify-content-around px-1'
        >
            <ActionWithInput 
                type = 'number'
                step = '1'
                value = { localX }
                actionText = 'X: '
                onChange = { event => setLocalX(Number(event.target.value)) }
                className = 'mr-1'
            />
            <ActionWithInput 
                type = 'number'
                step = '1'
                value = { localY }
                actionText = 'Y: '
                onChange = { event => setLocalY(Number(event.target.value)) }
            />
        </FlexRow>
    );
}

export default ModelPosition;