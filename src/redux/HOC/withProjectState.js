import React from 'react';
import { connect } from 'react-redux';
//Redux
import { 
    setProjectAction, 
    saveProjectAction, 
    restoreProjectAction,
    setProjectNameAction, 
    setProjectTypeAction,
    setProjectSceneAction,
    setDefaultTextureAction,
    setProjectObjectsAction, 
    addObjectToProjectAction,
    setProjectPDFPagesAction, 
    updateProjectObjectAction,
    set2DRoomDimensionsAction,
    set2DSceneDimensionsAction,
    set3DSceneDimensionsAction,
    set3DWallsVisibilityAction,
    setDisplayModelsMenuAction,
    setProjectDescriptionAction,
    addMiscObjectToProjectAction,
    removeObjectFromProjectAction,
    updateMiscProjectObjectAction,
    removeMiscObjectFromProjectAction,
} from '../reducers/projectDuck';

const withProjectState = WrappedComponent => {
    const WithProjectState = props => {
        let { 
            project,
            setProjectAction,
            saveProjectAction,
            restoreProjectAction,
            setProjectNameAction, 
            setProjectTypeAction,
            setProjectSceneAction,
            setDefaultTextureAction,
            setProjectObjectsAction, 
            addObjectToProjectAction,
            setProjectPDFPagesAction,
            updateProjectObjectAction,
            set2DRoomDimensionsAction,
            set2DSceneDimensionsAction,
            set3DSceneDimensionsAction,
            set3DWallsVisibilityAction,
            setDisplayModelsMenuAction,
            setProjectDescriptionAction,
            addMiscObjectToProjectAction,
            removeObjectFromProjectAction,
            updateMiscProjectObjectAction,
            removeMiscObjectFromProjectAction,
            ...ownProps
        } = props;

        const findObjectBy2DModelId = id2DModel => project.objects.find(object => object['2d'].uuid === id2DModel);
        const findObjectBy3DModelId = id3DModel => project.objects.find(object => object['3d'].uuid === id3DModel);

        const findMiscObjectBy2DModelId = id2DModel => project.otherObjects.find(object => object['2d'].uuid === id2DModel);
        const findMiscObjectBy3DModelId = id3DModel => project.otherObjects.find(object => object['3d'].uuid === id3DModel);

        const getModelRotationBy2DId = id2DModel => {
            const model = findObjectBy2DModelId(id2DModel);
            if(!model)
                return 0;
            return model.rotation;
        } 

        return <WrappedComponent 
            project = { project }
            addObject = { addObjectToProjectAction }
            setProject = { setProjectAction }
            saveProject = { saveProjectAction }
            updateObject = { updateProjectObjectAction }
            removeObject = { removeObjectFromProjectAction }
            addMiscObject = { addMiscObjectToProjectAction }
            restoreProject = { restoreProjectAction }
            setProjectName = { setProjectNameAction }
            setProjectType = { setProjectTypeAction }
            setProjectScene = { setProjectSceneAction }
            updateMiscObject = { updateMiscProjectObjectAction }
            removeMiscObject = { removeMiscObjectFromProjectAction }
            setDefaultTexture = { setDefaultTextureAction }
            setProjectObjects = { setProjectObjectsAction }
            setProjectPDFPages = { setProjectPDFPagesAction }
            set2DRoomDimensions = { set2DRoomDimensionsAction }
            set2DSceneDimensions = { set2DSceneDimensionsAction }
            set3DSceneDimensions = { set3DSceneDimensionsAction }
            set3DWallsVisibility = { set3DWallsVisibilityAction }
            setDisplayModelsMenu = { setDisplayModelsMenuAction }
            setProjectDescription = { setProjectDescriptionAction }
            findObjectBy2DModelId = { findObjectBy2DModelId }
            findObjectBy3DModelId = { findObjectBy3DModelId }
            getModelRotationBy2DId = { getModelRotationBy2DId }
            findMiscObjectBy2DModelId = { findMiscObjectBy2DModelId }
            findMiscObjectBy3DModelId = { findMiscObjectBy3DModelId }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            project: state.project,
            ...ownProps
        }
    }

    let WithState = connect(
        mapStateToProps, 
        { 
            setProjectAction, 
            saveProjectAction, 
            restoreProjectAction,
            setProjectNameAction, 
            setProjectTypeAction,
            setProjectSceneAction,
            setDefaultTextureAction,
            setProjectObjectsAction, 
            addObjectToProjectAction,
            setProjectPDFPagesAction, 
            updateProjectObjectAction,
            set2DRoomDimensionsAction,
            set2DSceneDimensionsAction,
            set3DSceneDimensionsAction,
            set3DWallsVisibilityAction,
            setDisplayModelsMenuAction,
            setProjectDescriptionAction,
            addMiscObjectToProjectAction,
            removeObjectFromProjectAction,
            updateMiscProjectObjectAction,
            removeMiscObjectFromProjectAction,
        }
    )(WithProjectState);
    return WithState;
}

export default withProjectState;
