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
import with3DRendererContextProvider from '../Renderer/3D/HOC/with3DRendererContextProvider';

const MainSectionRender = props => {
    //PROPS
    const { 
        project: { type: projectType },
        family,
        getFamily,
        editorState: { editorType, editorWidth, editorHeight }, 
        fetchingFamily,
    } = props;
    
    //HOOKS
    //Effects

    /* Every time the projectType changes we will fetch the new family data */
    useEffect(() => {
        if(projectType)
            getFamily();
    }, [projectType]);

    //Loading state
    if(fetchingFamily || !family)
        return <FamilyLoader 
            fetchingFamily = { fetchingFamily }
        />
    
    
    else return(
        editorWidth && editorHeight ?
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
//We apply the 3d renderer context provider
let With3DRendererContextProvider = with3DRendererContextProvider(WithFamilyState);
//We export the decorated component
export default With3DRendererContextProvider;