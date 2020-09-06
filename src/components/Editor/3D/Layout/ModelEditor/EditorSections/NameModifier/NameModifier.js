import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
//Components
import Container from '../../../../../../Layout/Containers/Container';
import EditorSection from '../EditorSection';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
//Icons
import { faFont } from '@fortawesome/free-solid-svg-icons';
//Styles
import './NameChanger.css';

const NameModifier = ({
    modelToEdit,
    updateObject,
    findObjectBy3DModelId,
}) => {
    //HOOKS
    //State
    const [projectModelData, setProjectModelData] = useState({ name: '' });

    //Refs
    const modelNameInput = useRef();

    //Effects
    useEffect(() => {
        //Input field shown by default
        $('#name_modifier').collapse('show');
    }, []);

    useEffect(() => {
        if(!modelToEdit)
            return;
        const { uuid } = modelToEdit;
        const projectModelData = findObjectBy3DModelId(uuid);
        setProjectModelData(projectModelData);
    }, [modelToEdit]);

    useEffect(() => {
        if(projectModelData)
            modelNameInput.current.value = projectModelData.name;
    }, [projectModelData])

    const handleNameChange = event => {
        const { target: { value } } = event;
        const updatedModelData = {
            ...projectModelData,
            name: value
        }
        updateObject(updatedModelData);
    }
    
    
    return (
        <EditorSection
            targetId = 'name_modifier'
            sectionIcon = { faFont }
            sectionName = 'Modificar nombre'
            defaultExpanded
        >
            <Container>
                <input 
                    ref = { modelNameInput }
                    type = 'text'
                    defaultValue = { projectModelData ? projectModelData.name : '' }
                    onChange = { handleNameChange }
                    className = 'name-changer__input mb-3'
                    placeholder = 'Nombre...'
                />
            </Container>
        </EditorSection>
    );
}

let WithProjectState = withProjectState(NameModifier);
export default WithProjectState;