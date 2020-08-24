import React from 'react';
import { connect } from 'react-redux';
//Redux
import { 
    saveProjectAction, 
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
            saveProjectAction,
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
            updateObject = { updateProjectObjectAction }
            removeObject = { removeObjectFromProjectAction }
            setProjectName = { setProjectNameAction }
            setProjectType = { setProjectTypeAction }
            setProjectObjects = { setProjectNameAction }
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
            saveProjectAction,
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
