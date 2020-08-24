import React from 'react';
//Components
import Row from '../../Layout/Grid/Row';
import Column from '../../Layout/Grid/Column';
import DimensionInput from './DimensionInput';
//Icons
import { faArrowsAltH, faArrowsAltV } from '@fortawesome/free-solid-svg-icons';

const DimensionsSettings = ({ projectEditorWidth, projectEditorHeight, handleSettingChange }) => (
    <Row
        className = 'text-center'
    >
        <Column
            mdBreakpoint = '6'
            smBreakpoint = '12'
        >
            <DimensionInput 
                icon = { faArrowsAltH }
                name = 'editorWidth'
                value = { projectEditorWidth }
                labelText = 'Ancho de la habitación'
                handleInputChange = { handleSettingChange }
            />
        </Column>
        <Column
            mdBreakpoint = '6'
            smBreakpoint = '12'
        >
            <DimensionInput 
                icon = { faArrowsAltV }
                name = 'editorHeight'
                value = { projectEditorHeight }
                labelText = 'Alto de la habitación'
                handleInputChange = { handleSettingChange }
            />
        </Column>
    </Row>
);

export default DimensionsSettings;