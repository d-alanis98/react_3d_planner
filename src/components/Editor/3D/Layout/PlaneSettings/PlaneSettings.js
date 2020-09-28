import React from 'react';
//Components
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';
import PropertyHeader from '../ModelEditor/PropertyHeader/PropertyHeader';
import WallsColorModifier from './Settings/WallsColorModifier/WallsColorModifier';
import FixedHeightContainer from '../../../../Layout/Containers/FixedHeightContainer';
import PlaneTextureModifier from './Settings/PlaneTextureModifier/PlaneTextureModifier';
//Icons
import { faCog } from '@fortawesome/free-solid-svg-icons';
//Styles
import './PlaneSettings.css';
import WallsVisibilityModifier from './Settings/WallsVisibilityModifier/WallsVisibilityModifier';



const PlaneSettings = ({ 
    containerRef,
    setDisplayPlaneSettings,
}) => (
    <div
        ref = { containerRef }
        className = 'plane-settings__container plane-settings__container--unmounted'
    >
        <FixedHeightContainer
            height = { 100 }
        >
            <FixedHeightContainer
                height = { 5 }
                relative
            >
                <PropertyHeader
                    onIconClick = { event => setDisplayPlaneSettings(false) }
                >
                    <LabelWithIcon 
                            icon = { faCog }
                            className = 'plane-settings__label'
                            labelText = 'Ajustes del plano'
                    />
                </PropertyHeader>
            </FixedHeightContainer>
            <FixedHeightContainer
                height = { 95 }
                relative
                className = 'py-3 overflow-auto'
            >
                <PlaneTextureModifier />
                <WallsColorModifier />
                <WallsVisibilityModifier />
            </FixedHeightContainer>
        </FixedHeightContainer>
    </div>
);


export default PlaneSettings;


/*
import React from 'react';
//Components
import ButtonWithIcon from '../../../../../../../Layout/Buttons/ButtonWithIcon';
//Factories
import TextureFactory from '../../../../../../../../classes/3D/Models/TextureFactory';
//Icons
import { faCog } from '@fortawesome/free-solid-svg-icons';

const PlaneSettings = ({ editorWidth, editorHeight, setEditorHeight, setEditorWidth, handleTextureChange }) => 
(
    <div className='dropup'>
        <div className='dropdown'>
            <ButtonWithIcon 
                id = '3d_scene_settings'
                icon = { faCog }
                type = 'outline-secondary'
                className = 'btn-sm rounded-pill px-2 py-2 mr-2'
                onHoverText = 'Ajustes'
                data-toggle = 'dropdown' 
                aria-haspopup ='true' 
                aria-expanded = 'false'
                iconClassName = 'mr-0'
            />
            <div className='dropdown-menu mb-5 px-3 oveflow-auto' aria-labelledby='3d_scene_settings'>
                <h5>Plane</h5>
                
                <div className='form-group'>
                    <h6>Textura:</h6>
                    <div>
                        <label>
                            <input 
                                type = 'checkbox'
                                value = { TextureFactory.FLOOR_TEXTURE } 
                                onChange = { handleTextureChange }
                                className = 'mr-2'
                            />
                            <img 
                                src = { TextureFactory.getTextureUri(TextureFactory.FLOOR_TEXTURE) } 
                                width = '30px' 
                                height = '30px' 
                                className = 'mr-2'
                            />
                            Piso
                        </label>
                    </div>
                    <div className='mt-2'>
                        <label>
                            <input 
                                type = 'checkbox'
                                value = { TextureFactory.WOOD_TEXTURE } 
                                onChange = { handleTextureChange }
                                className = 'mr-2'
                            />
                            <img 
                                src = { TextureFactory.getTextureUri(TextureFactory.WOOD_TEXTURE) } 
                                width = '30px' 
                                height = '30px' 
                                className = 'mr-2'
                            />
                            Duela
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default PlaneSettings;
*/