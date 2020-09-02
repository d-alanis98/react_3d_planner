import React from 'react';
import { connect } from 'react-redux';
//Redux
import { 
    setProjectAction, 
    saveProjectAction, 
    restoreProjectAction,
    setProjectNameAction, 
    setProjectTypeAction,
    setProjectObjectsAction, 
    addObjectToProjectAction, 
    updateProjectObjectAction,
    set2DRoomDimensionsAction,
    set2DSceneDimensionsAction,
    set3DSceneDimensionsAction,
    setDisplayModelsMenuAction,
    setProjectDescriptionAction,
    removeObjectFromProjectAction,
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
            setProjectObjectsAction, 
            addObjectToProjectAction,
            updateProjectObjectAction,
            set2DRoomDimensionsAction,
            set2DSceneDimensionsAction,
            set3DSceneDimensionsAction,
            setDisplayModelsMenuAction,
            setProjectDescriptionAction,
            removeObjectFromProjectAction,
            ...ownProps
        } = props;

        const findObjectBy3DModelId = id3DModel => project.objects.find(object => object['3d'].uuid === id3DModel);

        return <WrappedComponent 
            project = { project }
            addObject = { addObjectToProjectAction }
            setProject = { setProjectAction }
            saveProject = { saveProjectAction }
            updateObject = { updateProjectObjectAction }
            removeObject = { removeObjectFromProjectAction }
            restoreProject = { restoreProjectAction }
            setProjectName = { setProjectNameAction }
            setProjectType = { setProjectTypeAction }
            setProjectObjects = { setProjectObjectsAction }
            set2DRoomDimensions = { set2DRoomDimensionsAction }
            set2DSceneDimensions = { set2DSceneDimensionsAction }
            set3DSceneDimensions = { set3DSceneDimensionsAction }
            setDisplayModelsMenu = { setDisplayModelsMenuAction }
            setProjectDescription = { setProjectDescriptionAction }
            findObjectBy3DModelId = { findObjectBy3DModelId }
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
            setProjectObjectsAction,  
            addObjectToProjectAction,
            updateProjectObjectAction,
            set2DRoomDimensionsAction,
            set2DSceneDimensionsAction,
            set3DSceneDimensionsAction,
            setDisplayModelsMenuAction,
            setProjectDescriptionAction,
            removeObjectFromProjectAction,
        }
    )(WithProjectState);
    return WithState;
}

export default withProjectState;
