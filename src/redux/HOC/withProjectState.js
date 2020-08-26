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
            setProjectDescriptionAction,
            removeObjectFromProjectAction,
            ...ownProps
        } = props;

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
            setProjectDescription = { setProjectDescriptionAction }
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
            setProjectDescriptionAction,
            removeObjectFromProjectAction,
        }
    )(WithProjectState);
    return WithState;
}

export default withProjectState;
