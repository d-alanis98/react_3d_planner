import React from 'react';
//Components
import EditorSection from '../../../ModelEditor/EditorSections/EditorSection';
import CurrentWallColor from './CurrentWallColor/CurrentWallColor';
//Icons
import { faEyeDropper, faHome } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from './ColorPicker/ColorPicker';


const WallsColorModifier = () => {
    return (
        <EditorSection
            targetId = 'walls_color'
            sectionIcon = { faHome }
            sectionName = 'Cambiar el color de los muros'
            defaultExpanded
        >
            <CurrentWallColor />
            <ColorPicker />
        </EditorSection>
    );
}

export default WallsColorModifier;