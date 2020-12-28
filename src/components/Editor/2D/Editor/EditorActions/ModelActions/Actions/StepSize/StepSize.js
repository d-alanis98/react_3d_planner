import React from 'react';
import ActionWithInput from '../ActionWithInput/ActionWithInput';

const StepSize = ({ stepSize, setStepSize }) => {
    const handleStepChange = event => {
        try {
            let stepSize = Number(event.target.value);
            if(stepSize < 0)
                stepSize = 0;
            setStepSize(stepSize);
        } catch(error) {
            setStepSize(0);
        }
    }
    return(
        <ActionWithInput 
            type = 'number'
            step = '0.05'
            value = { stepSize }
            actionText = 'Step: '
            onChange = { handleStepChange }
        />
    );
}

export default StepSize;