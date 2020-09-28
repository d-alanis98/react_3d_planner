import React from 'react';
import { SketchPicker } from 'react-color'
import withPlaneState from '../../../../../../../../redux/HOC/withPlaneState';
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';

const ColorPicker = ({ 
    plane: { wallsColor },
    setWallsColor 
}) => {
    const onChangeColor = ({ hex }) => {
        setWallsColor(hex);
    }
    return (
        <FlexRow
            className = 'align-items-center justify-content-center mb-2'
        >
            <SketchPicker
                color = { wallsColor }
                width = '70%'
                onChangeComplete={ onChangeColor }
            /> 
        </FlexRow>
    )

}

export default withPlaneState(ColorPicker);