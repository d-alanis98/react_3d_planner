import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import Dropup from '../../../../../../Layout/Dropdowns/Dropup';
import WallVisibilityToggler from '../../../PlaneSettings/Settings/WallsVisibilityModifier/WallVisibilityToggler';
//HOC
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Icons
import { faCaretUp, faHome } from '@fortawesome/free-solid-svg-icons';
//Data
import { walls as wallsFromData, getWallIndexById, getWallIdByIndex } from '../../../PlaneSettings/Settings/WallsVisibilityModifier/wallsData';

const WallsVisibilityModifier = ({ 
    className,
    sceneWalls,
    displayWalls,
}) => {
    //CONSTANTS
    const WALLS_MODIFIER_MENU = 'walls_modifier_menu';
    //HOOKS
    //State
    const [walls, setWalls] = useState([]);
    const [wallsNotSet, setWallsNotSet] = useState(true);
    const [wallsVisibility, setWallsVisibility] = useState({});

    
    //useEffect(() => {
    useEffect(() => {
        //We set the walls, and we also turn off the walls not set flag
        setWalls(sceneWalls);
        setWallsNotSet(false);
        setWallsVisibility(
            sceneWalls.reduce((accumulated, current, index) => ({
                ...accumulated,
                [getWallIdByIndex(index)]: current.visible,
            }), {})
        );
    }, [sceneWalls]);
    //});

    console.log({ sceneWalls })



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
        if(walls.length > 0)
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
        <Dropup
            id = { WALLS_MODIFIER_MENU }
            togglerText = {            
                <FontAwesomeIcon 
                    icon = { faCaretUp }
                    size = 'lg'
                />  
            }
            noPadding
            className = { `btn btn-sm btn-${displayWalls ? 'outline-' : '' }secondary px-2 ${ className || ''}` }
        >
            <WallsVisibilityMenu 
                wallsFromData = { wallsFromData }
                handleWallChange = { handleWallChange }
                wallsVisibility = { wallsVisibility }
            />
        </Dropup>
    );
}

let With3DRendererContextConsumer = with3DRendererContextConsumer(WallsVisibilityModifier);
export default With3DRendererContextConsumer;


//EXTRA COMPONENTS

//WallsVisibilityMenu
const style = {
    margin: '0',
    padding: '0.5rem 0.5rem',
    backgroundColor: 'rgba(0,0,0,0.5)',
}
const WallsVisibilityMenu = ({ wallsFromData, handleWallChange, wallsVisibility }) => (
    <div
        style = { style }
    >
        {
            wallsFromData.map(({ wallId, wallName }, index) => (

                <WallVisibilityToggler
                    key = { wallId }
                    id = { wallId }
                    visible = { wallsVisibility[wallId] }
                    wallName = { wallName }
                    handleWallChange = { handleWallChange }
                />
                
            ))
        }
    </div>
);