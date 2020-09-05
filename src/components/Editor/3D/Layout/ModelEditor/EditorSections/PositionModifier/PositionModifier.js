import React from 'react';
//Components
import Container from '../../../../../../Layout/Containers/Container';
import AxisModifier from './AxisModifier';
import EditorSection from '../EditorSection';
//Icons
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';
//Styles
import './PositionModifier.css';


const PositionModifier = () => {
    return (
        <EditorSection
            targetId = 'position_modifier'
            sectionIcon = { faCrosshairs }
            sectionName = 'Modificar posición'
        >
            <Container>
                <AxisModifier 
                    axisLabel = 'X'
                />
                <AxisModifier 
                    axisLabel = 'Y'
                />
                <AxisModifier 
                    axisLabel = 'Z'
                />
            </Container>
        </EditorSection>
    )
}

export default PositionModifier;