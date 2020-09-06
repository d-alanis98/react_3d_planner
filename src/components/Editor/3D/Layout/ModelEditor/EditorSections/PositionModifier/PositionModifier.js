import React from 'react';
//Components
import Container from '../../../../../../Layout/Containers/Container';
import AxisModifier from './AxisModifier';
import EditorSection from '../EditorSection';
//HOC
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Icons
import { faCrosshairs, faArrowsAltH, faArrowsAltV, faArrowsAlt, faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
//Styles
import './PositionModifier.css';
import AxisDescription from './AxisDescription';
import AxisReference from '../../../../../../Miscelaneous/AxisReference/AxisReference';


const PositionModifier = ({ modelToEdit, rendererState }) => {

    const { updateModelPosition } = rendererState;

    const handlePositionChange = event => {
        const { target: { id: axis, value } } = event;
        
        const modelPosition = { ...modelToEdit.position };
        delete modelPosition[axis];
        modelPosition[axis] = Number(value);
        modelToEdit.position.set(modelPosition.x, modelPosition.y, modelPosition.z);
        if(updateModelPosition)
            updateModelPosition(modelToEdit.uuid, modelPosition);
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