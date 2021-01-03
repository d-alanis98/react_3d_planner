import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isEmptyObject } from 'jquery';
//Components
import Dropup from '../../../../../../Layout/Dropdowns/Dropup';
import WallVisibilityToggler from '../../../PlaneSettings/Settings/WallsVisibilityModifier/WallVisibilityToggler';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
import with3DRendererContextConsumer from '../../../../../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Classes
import TridimensionalRenderer from '../../../../../../../classes/Renderers/TridimensionalRenderer';
//Icons
import { faHome } from '@fortawesome/free-solid-svg-icons';
//Data
import { walls as wallsFromData, getWallIndexById, getWallIdByIndex } from '../../../PlaneSettings/Settings/WallsVisibilityModifier/wallsData';


const WallsVisibilityModifier = ({ 
    project: { scene },
    className,
    sceneWalls,
    displayWalls,
    set3DWallsVisibility,
    toggleWallsVisibility
}) => {
    //CONSTANTS
    const WALLS_MODIFIER_MENU = 'walls_modifier_menu';
    //HOOKS
    //State
    const [walls, setWalls] = useState([]);
    const [wallsVisibility, setWallsVisibility] = useState({});

    useEffect(() => {
        //We set the wall
        setWalls(sceneWalls);
        //If the walls could be restored successfully from the state we skip the wallVisibility update
        if(setWallsVisibilityFromState())
                return;
        setWallsVisibility(
            sceneWalls.reduce((accumulated, current, index) => ({
                ...accumulated,
                [getWallIdByIndex(index)]: current.visible,
            }), {})
        );
    }, [sceneWalls]);


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
        set3DWallsVisibility(wallsVisibility);
    }, [walls, wallsVisibility]);

    /**
     * Gets the walls visibility from the state and sets it locally, if it does not exists in state, returns false
     */
    const setWallsVisibilityFromState = () => {
        let tridimensionalScene = scene[TridimensionalRenderer.TRIDIMENSIONAL_SCENE];
        if(isEmptyObject(tridimensionalScene) || !tridimensionalScene.wallsVisibility || isEmptyObject(tridimensionalScene.wallsVisibility))
            return false;
        setWallsVisibility(tridimensionalScene.wallsVisibility);
        return true;
    }

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
                <Fragment>
                    <FontAwesomeIcon 
                        icon = { faHome }
                        size = 'lg'
                        className = 'mr-1'
                    />  
                    Muros
                </Fragment> 
            }
            noPadding
            className = { `btn btn-sm btn-${displayWalls ? 'outline-' : '' }secondary px-0 py-0 mr-2 rounded-pill ${ className || ''}` }
            togglerClassName = 'px-3 py-2'
        >
            <WallsVisibilityMenu 
                displayWalls = { displayWalls }
                wallsFromData = { wallsFromData }
                wallsVisibility = { wallsVisibility }
                handleWallChange = { handleWallChange }
                toggleWallsVisibility = { toggleWallsVisibility }
            />
        </Dropup>
    );
}

let With3DRendererContextConsumer = with3DRendererContextConsumer(WallsVisibilityModifier);
let WithProjectState = withProjectState(With3DRendererContextConsumer);
export default WithProjectState;


//EXTRA COMPONENTS

//WallsVisibilityMenu
const style = {
    margin: '0',
    padding: '0.5rem 0.5rem',
    backgroundColor: 'rgba(0,0,0,0.5)',
}
const WallsVisibilityMenu = ({ 
    displayWalls,
    wallsFromData, 
    wallsVisibility, 
    handleWallChange, 
    toggleWallsVisibility 
}) => (
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
        <hr 
            style = {{ borderTop: '1px solid rgba(255, 255, 255, 0.5)'}}
        />
        <WallVisibilityToggler 
            visible = { displayWalls }
            customLabel = { displayWalls ? 'Ocultar todos los muros' : 'Mostrar todos los muros' }
            handleWallChange = { ev => toggleWallsVisibility() }
        />

    </div>
);