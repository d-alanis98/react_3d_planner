import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
//Components
import Container from '../../../../../../Layout/Containers/Container';
import EditorSection from '../EditorSection';
//HOC
import withProjectState from '../../../../../../../redux/HOC/withProjectState';
//Icons
import { faFont } from '@fortawesome/free-solid-svg-icons';

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
    
    const { name: modelName } = projectModelData;

    return (
        <EditorSection
            targetId = 'name_modifier'
            sectionIcon = { faFont }
            sectionName = 'Modificar nombre'
        >
            <Container>
                <input 
                    ref = { modelNameInput }
                    type = 'text'
                    defaultValue = { modelName }
                    onChange = { handleNameChange }
                    className = 'form-control mb-3'
                    placeholder = 'Nombre...'
                />
            </Container>
        </EditorSection>
    )
}

let WithProjectState = withProjectState(NameModifier);
export default WithProjectState;