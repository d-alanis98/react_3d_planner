import React from 'react';
//Components
import AxisModifier from './AxisModifier';
import AxisReference from '../../../../../../Miscelaneous/AxisReference/AxisReference';
import EditorSection from '../EditorSection';
import AxisDescription from './AxisDescription';
//HOC
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Classes
import ModelPositionCalculator from '../../../../../../../classes/3D/Models/ModelPositionCalculator';
//Icons
import { faCrosshairs, faArrowsAltH, faArrowsAltV, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
//Styles
import './PositionModifier.css';
import Row from '../../../../../../Layout/Grid/Row';
import Column from '../../../../../../Layout/Grid/Column';




const PositionModifier = ({ modelToEdit, rendererState }) => {
    //PROPS DESTRUCTURING
    const { 
        updateModelPositionParameters 
    } = rendererState;

    //CONSTANTS
    const { uuid: modelId } = modelToEdit;

    //HANDLERS
    const handlePositionChange = event => {
        const { target: { id: axis, value } } = event;
        //We get a shallow copy of the position
        const modelPosition = { ...modelToEdit.position };
        //We delete the previous position in the current axis
        delete modelPosition[axis];
        //We update this axis with the value obtained from the event
        modelPosition[axis] = Number(value);
        //We set the position to the new coordinates
        const { x, y, z } = modelPosition;
        modelToEdit.position.set(x, y, z);
        //We also get the new maximum point in the Y and Z axis (for the 2D layer reconstruction) and we update it in the state
        const maxPointInY = ModelPositionCalculator.getMaximumPointInY(modelToEdit);
        const maxPointInZ = ModelPositionCalculator.getMaximumPointInZ(modelToEdit);
        //We update the position parameters (coordinates and maximum point in Y)
        if(updateModelPositionParameters)
            updateModelPositionParameters(modelId, modelPosition, maxPointInY, maxPointInZ);
    }
    return (
        <EditorSection
            targetId = 'position_modifier'
            sectionIcon = { faCrosshairs }
            sectionName = 'Modificar posición'
        >
            <Row
            >
                <Column
                    mdBreakpoint = { 12 }
                    lgBreakpoint = { 6 }
                >
                    <AxisModifier 
                        id = 'x'
                        value = { modelToEdit.position.x }
                        onChange = { handlePositionChange }
                        axisLabel = 'X'
                    />
                    <AxisDescription 
                        icon = { faArrowsAltH }
                        description = 'Modifica la posición a lo largo del plano'
                    />
                    <AxisModifier 
                        id = 'y'
                        value = { modelToEdit.position.y }
                        onChange = { handlePositionChange }
                        axisLabel = 'Y'
                    />
                    <AxisDescription 
                        icon = { faArrowsAltV }
                        description = 'Modifica la posición a lo alto del plano'
                    />
                    <AxisModifier 
                        id = 'z'
                        value = { modelToEdit.position.z }
                        onChange = { handlePositionChange }
                        axisLabel = 'Z'
                    />
                    
                    <AxisDescription 
                        icon = { faExpandArrowsAlt }
                        description = 'Modifica la posición a lo ancho del plano'
                    />
                </Column>
                <Column
                    mdBreakpoint = { 12 }
                    lgBreakpoint = { 6 }
                >
                    <AxisReference />
                </Column>
            </Row>
        </EditorSection>
    );
}


//We apply the 3D renderer context consumer HOC to get access to the methods and scene instance of the with3DRenderer HOC
let With3DRendererContextConsumer = with3DRendererContextConsumer(PositionModifier);
//We export the decorated component
export default With3DRendererContextConsumer;