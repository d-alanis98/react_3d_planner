import React, { useEffect, useRef, useState } from 'react';
import withPlaneState from '../../../../../redux/HOC/withPlaneState';
import PlaneSettings from './PlaneSettings';

const PlaneSettingsContainer = ({
    plane: { displayPlaneSettings },
    setDisplayPlaneSettings,
}) => {
    //Refs
    const planeSettingsContainer = useRef();

    //Effects
    useEffect(() => () => {
        //On component unmount we hide the plane settings in the state also
        setDisplayPlaneSettings(false);
    }, []);

    useEffect(() => {
        if(displayPlaneSettings) {
            planeSettingsContainer.current.classList.remove('plane-settings__container--unmounted');
            planeSettingsContainer.current.classList.add('plane-settings__container--mounted');
        }
        else {
            planeSettingsContainer.current.classList.remove('plane-settings__container--mounted');
            planeSettingsContainer.current.classList.add('plane-settings__container--unmounted');
        }
    }, [displayPlaneSettings]);

    return <PlaneSettings 
        containerRef = { planeSettingsContainer }
        setDisplayPlaneSettings = { setDisplayPlaneSettings }
    />
}

export default withPlaneState(PlaneSettingsContainer);