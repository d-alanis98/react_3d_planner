import React, { useEffect } from 'react';
//Components
import FamilyLoader from './FamilyLoader';
import ProjectSettings from '../ProjectSettings/ProjectSettings';
//HOC
import withEditorState from '../../redux/HOC/withEditorState';
import withFamilyState from '../../redux/HOC/withFamilyState';
import withProjectState from '../../redux/HOC/withProjectState';
//Constants
import { SectionComponentToRender } from '../../constants/sections/sections';
import withPDFGenerationControls from '../PDFGenerator/HOC/withPDFGenerationControls';
import ObjectsHelper from '../../classes/Helpers/ObjectsHelper';


const MainSectionRender = props => {
    //PROPS
    const { 
        project: { id: designId, cotizationId, type: projectType, isNewProject },
        family,
        getFamily,
        saveProject,
        editorState: { editorType }, 
        getMiscObjects,
        fetchingFamily,
        fetchingOtherObjects
    } = props;
    
    //HOOKS
    //Effects

    /* Every time the projectType changes we will fetch the new family data */
    useEffect(() => {
        if(!isNewProject)
            getFamily();
    }, [
        projectType, 
        isNewProject
    ]);

    useEffect(() => {
        getMiscObjects()
    }, []);

    /**
     * Interval to save the project every 30 seconds
     */
    useEffect(() => {
        if(!designId)
            return;
        let saveProjectInterval = setInterval(() => saveProject({ silentSave: true }), 30000);
        return () => clearInterval(saveProjectInterval);
    }, [designId]); 


    const shouldSectionComponentRender = () => designId && family && !ObjectsHelper.isEmpty(family);

    //Loading state
    if(fetchingFamily)
        return <FamilyLoader 
            fetchingFamily = { fetchingFamily }
        />

    if(fetchingOtherObjects)
        return <FamilyLoader 
            loadingText = 'Obteniendo objetos adicionales...'
            fetchingFamily = { fetchingOtherObjects }
        />
    
    else return (
        shouldSectionComponentRender() ?
            SectionComponentToRender[editorType]
        : <ProjectSettings />
    );
}
//We apply the editor state HOC
let WithEditorState = withEditorState(MainSectionRender);
//We apply the project state HOC
let WithProjectState = withProjectState(WithEditorState);
//We apply the family state HOC
let WithFamilyState = withFamilyState(WithProjectState);
//We apply the PDF generation controls HOC
let WithPDFGenerationControls = withPDFGenerationControls(WithFamilyState);
//We export the decorated component
export default WithPDFGenerationControls;