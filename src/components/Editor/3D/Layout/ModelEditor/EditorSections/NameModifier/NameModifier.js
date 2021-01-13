import React, { useState, useEffect, useRef } from 'react';
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
    isFor2DModel,
    onNameUpdate,
    findObjectBy2DModelId,
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
        document.querySelector('#name_modifier').classList.add('show');
        //$('#name_modifier').collapse('show');
    }, []);

    useEffect(() => {
        if(!modelToEdit)
            return;
            
        let projectModelData;
        if(isFor2DModel) {
            const { _id } = modelToEdit;
            projectModelData = findObjectBy2DModelId(_id);
        } else {
            const { uuid } = modelToEdit;
            projectModelData = findObjectBy3DModelId(uuid);
        }

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
        onNameUpdate && typeof onNameUpdate === 'function' && onNameUpdate(value);
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