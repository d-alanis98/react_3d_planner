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
    updateMiscObject,
    findObjectBy2DModelId,
    findObjectBy3DModelId,
    findMiscObjectBy2DModelId
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
            projectModelData = isProjectObject(modelToEdit) 
                ? getProjectObject()
                : getMiscObject();
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

    const isProjectObject = modelToEdit => modelToEdit?.attrs?.type;

    const getProjectObject = () => findObjectBy2DModelId(modelToEdit._id);

    const getMiscObject = () => findMiscObjectBy2DModelId(modelToEdit._id);

    const handleNameChange = event => {
        const { target: { value } } = event;
        const updatedModelData = {
            ...projectModelData,
            name: value,
            modelName: value
        }
        onNameUpdate && typeof onNameUpdate === 'function' && onNameUpdate(value);
        isProjectObject(modelToEdit)
            ?   updateObject(updatedModelData)
            :   updateMiscObject(updatedModelData);
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