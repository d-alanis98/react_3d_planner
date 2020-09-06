import React from 'react';
//Component
import NameModifier from './EditorSections/NameModifier/NameModifier';
import TextureModifier from './EditorSections/TextureModifier/TextureModifier';
import PositionModifier from './EditorSections/PositionModifier/PositionModifier';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
import SelectModelWarning from './SelectModelWarning';


const EditorSectionRenderer = ({ modelToEdit }) => {
    if(modelToEdit)
        return (
            <FixedHeightContainer
                height = { 85 }
                relative
                className = 'overflow-auto'
            >
                <NameModifier 
                    modelToEdit = { modelToEdit }
                />
                <PositionModifier 
                    modelToEdit = { modelToEdit }
                />
                <TextureModifier
                    modelToEdit = { modelToEdit }
                />
            </FixedHeightContainer>
        );
    return <SelectModelWarning />;
}

export default EditorSectionRenderer;