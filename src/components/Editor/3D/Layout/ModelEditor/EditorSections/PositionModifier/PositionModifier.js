import React from 'react';
//Components
import Container from '../../../../../../Layout/Containers/Container';
import AxisModifier from './AxisModifier';
import AxisReference from '../../../../../../Miscelaneous/AxisReference/AxisReference';
import EditorSection from '../EditorSection';
import AxisDescription from './AxisDescription';
//HOC
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Icons
import { faCrosshairs, faArrowsAltH, faArrowsAltV, faArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
//Styles
import './PositionModifier.css';
import ModelPositionCalculator from '../../../../../../../classes/3D/Models/ModelPositionCalculator';




const PositionModifier = ({ modelToEdit, rendererState }) => {
    //PROPS DESTRUCTURING
    const { updateModelPosition, updateModelMaxPointInY } = rendererState;

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
        //We update the model position
        if(updateModelPosition)
            updateModelPosition(modelToEdit.uuid, modelPosition);
        //We also get the new maximum point in the y axis (for the 2D layer reconstruction) and we update it in the state
        const maxPointInY = ModelPositionCalculator.getMaximumPointInY(modelToEdit);
        //@todo Temporal fix = passing the modelPosition, but it breaks single responsinility principle. FIX
        if(updateModelMaxPointInY)
            updateModelMaxPointInY(modelToEdit.uuid, maxPointInY, modelPosition);
        //FIX = updateModelPositionParameters(uuid, modelPosition, maxPointInY)
    }
    return (
        <EditorSection
            targetId = 'position_modifier'
            sectionIcon = { faCrosshairs }
            sectionName = 'Modificar posición'
        >
            <Container>
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
                <hr/>
                <AxisReference />
            </Container>
        </EditorSection>
    )
}


let With3DRendererContextConsumer = with3DRendererContextConsumer(PositionModifier);
export default With3DRendererContextConsumer;