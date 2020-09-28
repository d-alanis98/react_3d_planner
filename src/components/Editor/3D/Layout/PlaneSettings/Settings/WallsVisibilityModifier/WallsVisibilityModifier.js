import React, { useEffect, useState } from 'react';
//Components
import EditorSection from '../../../ModelEditor/EditorSections/EditorSection';
import WallVisibilityToggler from './WallVisibilityToggler';
//HOC
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Icons
import { faEye } from '@fortawesome/free-solid-svg-icons';
//Data
import { walls as sceneWalls, getWallIndexById, getWallIdByIndex } from './wallsData';


const WallsVisibilityModifier = ({ 
    rendererState,
    rendererState: { 
        sceneInstance, displayWalls
    }
}) => {
    

    const [walls, setWalls] = useState([]);
    const [wallsVisibility, setWallsVisibility] = useState({});

    useEffect(() => {
        
        if(sceneInstance) {
            setWalls(sceneInstance.walls);
            setWallsVisibility(
                sceneInstance.walls.reduce((accumulated, current, index) => ({
                    ...accumulated,
                    [getWallIdByIndex(index)]: current.visible,
                }), {})
            );
        }
    }, [rendererState]);


    /**
     * We listen for changes in the renderer displayWalls property (triggered with the show/hide walls button in plane
     * action buttons) and set the local state accordingly.
     */
    useEffect(() => {
        if(walls.length === 0)
            return;

        setWallsVisibility(
            walls.reduce((accumulated, current, index) => ({
                ...accumulated,
                [getWallIdByIndex(index)]: displayWalls,
            }), {})
        );
    }, [displayWalls])

    /**
     * When the visibility of a wall change, we will apply the correct values to the walls.
     */
    useEffect(() => {
        Object.entries(wallsVisibility).forEach(([ wallId, visible ]) => (
            walls[getWallIndexById(wallId)].visible = visible
        ));
    }, [wallsVisibility])

    /**
     * When a wall visibility is toggled we update the state to set the new visibility.
     * @param {object} event 
     */
    const handleWallChange = event => {
        const { currentTarget: { id: wallId } } = event;
        let wallPreviousVisibility = wallsVisibility[wallId] || false;
        setWallsVisibility({
            ...wallsVisibility,
            [wallId]: !wallPreviousVisibility,
        });
    }

    if(walls.length === 0)
        return null;

    return (
        <EditorSection
            targetId = 'walls_visibility'
            sectionIcon = { faEye }
            sectionName = 'Cambiar la visibilidad'
            defaultExpanded
        >
            {
                sceneWalls.map(({ wallId, wallName }, index) => (
                    <WallVisibilityToggler 
                        key = { wallId }
                        id = { wallId }
                        visible = { wallsVisibility[wallId] }
                        wallName = { wallName }
                        handleWallChange = { handleWallChange }
                    />
                ))
            }
        </EditorSection>
    );
}

export default with3DRendererContextConsumer(WallsVisibilityModifier);