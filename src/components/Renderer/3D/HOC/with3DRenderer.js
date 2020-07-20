import React, { useState, useEffect } from 'react';
//Classes
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
//Factories

//Constantes
import { getModelUri } from '../../../../constants/models/models';
import CameraRotationFactory from '../../../../classes/3D/Camera/CameraRotationFactory';


const with3DRenderer = (WrappedComponent) => {

    const With3DRenderer = props => {
        const [models, setModels] = useState({});
        const [sceneInstance, setSceneInstance] = useState();
        const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);

        useEffect(() => {
            let scene = new TridimensionalRenderer();
            scene.init();
            setSceneInstance(scene);
        }, []);

        const addModel = type => {
            let uri = getModelUri(type);
            increaseModelQuantity(type);
            sceneInstance.load3DModel(uri);
        }

        const toggleOrbitControls = () => {
            setOrbitControlsEnabled(!orbitControlsEnabled);
        }

        const increaseModelQuantity = type => {
            let modelsCopy = { ...models };
            modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
            setModels(modelsCopy);
        }

        const rotateCamera = (view = 'TOP_VIEW', distance = null) => {
            let cameraDistance = distance || TridimensionalRenderer.DEFAULT_CAMERA_DISTANCE;
            //We get the available views
            let { TOP_VIEW, BACK_VIEW, FRONT_VIEW, FRONT_LEFT, FRONT_RIGHT, ISOMETRIC_VIEW } = CameraRotationFactory;
            
            let cameraPositionVector = CameraRotationFactory.createCameraRotationVector(view);
            sceneInstance.camera.position.copy(cameraPositionVector);
        }
        useEffect(() => {
            if(sceneInstance){
                sceneInstance.setOrbitControlsEnabled(orbitControlsEnabled);
            }
        }, [orbitControlsEnabled])

        return <WrappedComponent
            models = { models }
            addModel = { addModel }
            rotateCamera = { rotateCamera }
            orbitControlsEnabled = { orbitControlsEnabled }
            toggleOrbitControls = { toggleOrbitControls }
            { ...props }
        />
    }

    return With3DRenderer;
}

export default with3DRenderer;