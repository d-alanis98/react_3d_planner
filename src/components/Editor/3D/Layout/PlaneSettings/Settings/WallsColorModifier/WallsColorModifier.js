import React from 'react';
//Components
import ColorPicker from './ColorPicker/ColorPicker';
import EditorSection from '../../../ModelEditor/EditorSections/EditorSection';
import CurrentWallColor from './CurrentWallColor/CurrentWallColor';
//Icons
import { faHome } from '@fortawesome/free-solid-svg-icons';

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