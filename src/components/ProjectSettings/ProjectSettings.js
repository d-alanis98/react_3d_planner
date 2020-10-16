import React, { useState, useEffect } from 'react';
//Components
import Container from '../Layout/Containers/Container';
import ProjectType from './Details/ProjectType';
import ProjectName from './Details/ProjectName';
import LabelWithIcon from '../Layout/Labels/LabelWithIcon';
import DimensionsSettings from './Dimensions/DimensionsSettings';
import ProjectDescription from './Details/ProjectDescription';
import SaveSettingsButton from './SaveSettingsButton';
//HOC
import withEditorState from '../../redux/HOC/withEditorState';
import withProjectState from '../../redux/HOC/withProjectState';
import withNotifications from '../Notifications/HOC/withNotifications';
//Icons
import { faCogs, faCrop  } from '@fortawesome/free-solid-svg-icons';
//Constants
import { createNotificationAction, NOTIFICATION_DANGER, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD } from '../../redux/reducers/notificationDuck';






const ProjectSettings = props => {
    //CONSTANTS
    const NO_COTIZATION_ID_WARNING   = 'El id de cotización es requerido';
    const CHANGES_SAVED_SUCCESSFULLY = 'Cambios guardados exitosamente';
    //Props destructuring
    const { 
        project: { name, type, description, isNewProject, cotizationId }, 
        editorState: { editorDepth, editorHeight, editorWidth },
        saveProject,
        setProjectName, 
        setProjectType,
        setEditorDepth,
        setEditorWidth,
        setEditorHeight,
        createNotification,
        set3DSceneDimensions,
        setProjectDescription, 
    } = props;

    //Initial state
    const initialState = {
        projectName: name,
        projectType: type,
        editorDepth,
        editorWidth,
        editorHeight,
        projectDescription: description,
    }
    //HOOKS
    //State
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [fieldsValidated, setFieldsValidated] = useState(false);
    const [projectSettings, setProjectSettings] = useState(initialState);
    
    //Project settings destructuring
    const { 
        projectName, 
        projectType,
        editorDepth: projectEditorDepth,
        editorWidth: projectEditorWidth, 
        editorHeight: projectEditorHeight, 
        projectDescription, 
    } = projectSettings;

    //Effects
    useEffect(() => {
        cotizationId && projectName && projectDescription && projectEditorWidth && projectEditorHeight ?
            setFieldsValidated(true)
        : setFieldsValidated(false);
    }, [projectSettings]);

    useEffect(() => {
        if(!cotizationId)
            createNotification(NO_COTIZATION_ID_WARNING, NOTIFICATION_DANGER);
    }, [cotizationId]);


    const setNewURLParameters = designId => {
        const existingURL = window.location.href;
        window.location.assign(`${existingURL}&id_disenhio=${designId}`);
    }

    const saveProjectChanges = event => {
        event.preventDefault();
        setUnsavedChanges(false);
        setProjectName(projectName);
        setProjectType(projectType);
        //Editor dimensions
        setEditorDepth(projectEditorDepth);
        setEditorWidth(projectEditorWidth);
        setEditorHeight(projectEditorHeight);
        //Because the 3d scene dimensions don´t deppend on screen size (because they are not set in pixels), we can set them at this point
        set3DSceneDimensions(projectEditorWidth, projectEditorHeight);
        setProjectDescription(projectDescription);
        //We save the changes in the server
        saveProject()
            .then(designId => {
                //We create a success notification
                createNotification(CHANGES_SAVED_SUCCESSFULLY, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD);
                //If the project is new, we update the URL with the design Id
                isNewProject && setNewURLParameters(designId);
            });

    }

    const handleSettingChange = event => {
        let { target: { name, value } } = event;
        if(name === 'editorWidth' || name === 'editorHeight' || name === 'editorDepth')
            value = Number(value) / 100;
        setProjectSettings({
            ...projectSettings,
            [name]: value
        });
        setUnsavedChanges(true);
    }

    return(
        <Container
            className = 'mt-3 py-3'
        >
            <LabelWithIcon 
                icon = { faCogs }
                labelText = 'Ajustes del proyecto'
                className = 'h4 text-muted'
            />
            <hr />
            <ProjectType 
                projectType = { projectType }
                isNewProject = { isNewProject }
                handleSettingChange = { handleSettingChange }
            />
            <ProjectName 
                projectName = { projectName }
                handleSettingChange = { handleSettingChange }
            />
            <ProjectDescription 
                projectDescription = { projectDescription }
                handleSettingChange = { handleSettingChange }
            />
            <hr />
            <LabelWithIcon 
                icon = { faCrop }
                labelText = 'Ajustes del editor'
                className = 'h5 text-muted'
            />
            <DimensionsSettings 
                projectEditorDepth = { projectEditorDepth }
                projectEditorWidth = { projectEditorWidth }
                projectEditorHeight = { projectEditorHeight }
                handleSettingChange = { handleSettingChange }
            />
            <SaveSettingsButton 
                unsavedChanges = { unsavedChanges }
                fieldsValidated = { fieldsValidated }
                saveProjectChanges = { saveProjectChanges }
            />
        </Container>
    );
}

//We apply the project state HOC
let WithProjectState = withProjectState(ProjectSettings);
//We apply the editor state HOC
let WithEditorState = withEditorState(WithProjectState);

let WithNotifications = withNotifications(WithEditorState)
//We export the decorated component
export default WithNotifications;