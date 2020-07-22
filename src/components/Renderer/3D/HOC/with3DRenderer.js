import React, { useState, useEffect } from 'react';
//Classes
import TridimensionalRenderer from '../../../../classes/Renderers/TridimensionalRenderer';
//Factories
import TextureFactory from '../../../../classes/3D/Models/TextureFactory';
import CameraRotationFactory from '../../../../classes/3D/Camera/CameraRotationFactory';
//Functions
import { getModelUri } from '../../../../constants/models/models';


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

        const addTextureToObject = (object, textureUri) => sceneInstance.addTextureToObject(object, textureUri);

        const addTextureToPlane = texture => {
            let textureUri = TextureFactory.getTextureUri(texture);
            sceneInstance.addTextureToObject(sceneInstance.plane, textureUri);
        }

        const rotateCamera = (view = 'TOP_VIEW') => {
            let cameraDistance = sceneInstance.getOptimalCameraDistance();
            //We get the available views
            let cameraPositionVector = CameraRotationFactory.createCameraRotationVector(view, cameraDistance);
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
            addTextureToPlane = { addTextureToPlane }
            addTextureToObject = { addTextureToObject }
            toggleOrbitControls = { toggleOrbitControls }
            orbitControlsEnabled = { orbitControlsEnabled }
            { ...props }
        />
    }

    return With3DRenderer;
}

export default with3DRenderer;