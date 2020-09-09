import React from 'react';
//Components
import Row from '../../Layout/Grid/Row';
import Column from '../../Layout/Grid/Column';
import DimensionInput from './DimensionInput';
//Icons
import { faArrowsAltH, faArrowsAltV, faArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const DimensionsSettings = ({ projectEditorWidth, projectEditorHeight, projectEditorDepth, handleSettingChange }) => (
    <Row
        className = 'text-center'
    >
        <Column
            mdBreakpoint = '4'
            smBreakpoint = '6'
        >
            <DimensionInput 
                icon = { faArrowsAltH }
                name = 'editorWidth'
                value = { projectEditorWidth * 100 }
                labelText = 'Ancho de la habitación'
                handleInputChange = { handleSettingChange }
            />
        </Column>
        <Column
            mdBreakpoint = '4'
            smBreakpoint = '6'
        >
            <DimensionInput 
                icon = { faExpandArrowsAlt }
                name = 'editorHeight'
                value = { projectEditorHeight * 100 }
                labelText = 'Fondo de la habitación'
                handleInputChange = { handleSettingChange }
            />
        </Column>
        <Column
            mdBreakpoint = '4'
            smBreakpoint = '6'
        >
            <DimensionInput 
                icon = { faArrowsAltV }
                name = 'editorDepth'
                value = { projectEditorDepth * 100 }
                labelText = 'Alto de la habitación'
                handleInputChange = { handleSettingChange }
            />
        </Column>
    </Row>
);

export default DimensionsSettings;