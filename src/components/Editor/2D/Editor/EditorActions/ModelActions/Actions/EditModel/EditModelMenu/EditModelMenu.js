import React, { useEffect, useState, Fragment } from 'react';
import { isEmptyObject } from 'jquery';
//Components
import Row from '../../../../../../../../Layout/Grid/Row';
import Column from '../../../../../../../../Layout/Grid/Column';
import FlexRow from '../../../../../../../../Layout/Flex/FlexRow';
import MenuHeader from './MenuHeader/MenuHeader';
import RotateModel from '../../RotateModel/RotateModel';
import CircularIcon from '../../../../../../../../Layout/Icons/CircularIcon';
import AxisModifier from '../../../../../../../3D/Layout/ModelEditor/EditorSections/PositionModifier/AxisModifier';
import NameModifier from '../../../../../../../3D/Layout/ModelEditor/EditorSections/NameModifier/NameModifier';
import EditorSection from '../../../../../../../3D/Layout/ModelEditor/EditorSections/EditorSection';
import LabelWithIcon from '../../../../../../../../Layout/Labels/LabelWithIcon';
import AxisReference from '../../../../../../../../Miscelaneous/AxisReference/AxisReference';
import AxisDescription from '../../../../../../../3D/Layout/ModelEditor/EditorSections/PositionModifier/AxisDescription';
//HOC
import withProjectState from '../../../../../../../../../redux/HOC/withProjectState';
//Style
import './EditModelMenu.css';
//Icons
import { faArrowsAltH, faArrowsAltV, faCrop, faExpandArrowsAlt, faTools, faTrash } from '@fortawesome/free-solid-svg-icons';






const EditModelMenu = ({ 
    rotate,
    toggleMenu,
    deleteModel,
    modelToEdit,
    showEditMenu,
    modelEditorInstance
}) => (
    <div
        className = { `edit-model-menu__container ${showEditMenu ? 'edit-model-menu--show' : 'edit-model-menu--hide'}` }
    >
        <ModelMenuSections 
            rotate = { rotate }
            toggleMenu = { toggleMenu }
            deleteModel = { deleteModel }
            modelToEdit = { modelToEdit }
            modelEditorInstance = { modelEditorInstance }
        />
    </div>
);

export default EditModelMenu;


const ModelMenuSections = ({
    rotate,
    toggleMenu,
    deleteModel,
    modelToEdit,
    modelEditorInstance
}) => {

    const handleNameUpdate = newName => {
        modelEditorInstance.editName(newName);
    }

    return (
        <div>
            <MenuHeader 
                toggleMenu = { toggleMenu }
            />
            <hr />
            <QuickActions 
                rotate = { rotate }
                deleteModel = { deleteModel }
            />
            <NameModifier 
                modelToEdit = { modelToEdit }
                isFor2DModel
                onNameUpdate = { handleNameUpdate }
            />
            <ScaleModifierWithState 
                modelToEdit = { modelToEdit }
                modelEditorInstance = { modelEditorInstance }
            />
        </div>
    );
}

const QuickActions = ({ rotate, deleteModel }) => (
    <Fragment>
        <LabelWithIcon 
            icon = { faTools }
            className = 'text-light mb-0'
            labelText = 'Acciones rápidas'
        />
        <FlexRow
            className = 'align-items-center justify-content-around mb-2 p-2'
        >
            <RotateModel 
                rotate = { rotate }
            />
            <DeleteModel
                deleteModel = { deleteModel }
            />
        </FlexRow>
    </Fragment>
);

const DeleteModel = ({ deleteModel }) => (
    <CircularIcon 
        icon = { faTrash }
        onClick = { () => deleteModel() }
        iconClassName = 'text-danger'
    />
);

const ScaleModifier = ({ 
    project, 
    modelToEdit,
    updateObject,
    modelEditorInstance,
    findObjectBy2DModelId 
}) => {

    const [scale, setScale] = useState({});
    const [localScale, setLocalScale] = useState({});

    useEffect(() => {
        const projectModel = findObjectBy2DModelId(modelToEdit._id);
        const { scale: existingScale = { } } = projectModel; 
        setLocalScale(existingScale);
        setScale({
            x: existingScale.x || 1,
            y: existingScale.y || 1,
            z: existingScale.z || 1,
        });
    }, [modelToEdit]);

    const updateScaleInState = () => {
        const projectModel = findObjectBy2DModelId(modelToEdit._id);
        updateObject({
            ...projectModel,
            scale: localScale
        });
    }

    /**
     * localScale is the local scale value, to avoid fighting contiditions between state updates, we keep a local 
     * state, and whenever it changes, it triggers the "real" global state change.
     */
    useEffect(() => {
        if(isEmptyObject(localScale))
            return;
        updateScaleInState();
    }, [localScale]);

    const handleScaleChange = event => {
        const { target: { id: axis, value } } = event;
        setScale({
            ...scale,
            [axis]: value,
        });
        modelEditorInstance.editScale(axis, Number(value), project.scene['2d'].view);
        setLocalScale({
            ...localScale,
            [axis]: value
        });
    }
    

    return (
        <EditorSection
            targetId = 'scale_modifier'
            sectionIcon = { faCrop }
            sectionName = 'Modificar escala'
        >
            <Row>
                <Column
                    mdBreakpoint = { 12 }
                    lgBreakpoint = { 6 }
                >
                    <AxisModifier 
                        id = 'x'
                        value = { scale.x || 1 }
                        onChange = { handleScaleChange }
                        axisLabel = 'X'
                        withoutUnits
                    />
                    <AxisDescription 
                        icon = { faArrowsAltH }
                        description = 'Modifica la escala a lo largo del modelo'
                    />
                    <AxisModifier 
                        id = 'y'
                        value = { scale.y || 1 }
                        onChange = { handleScaleChange }
                        axisLabel = 'Y'
                        withoutUnits
                    />
                    <AxisDescription 
                        icon = { faArrowsAltV }
                        description = 'Modifica la escala a lo alto del modelo'
                    />
                    <AxisModifier 
                        id = 'z'
                        value = { scale.z || 1 }
                        onChange = { handleScaleChange }
                        axisLabel = 'Z'
                        withoutUnits
                    />
                    
                    <AxisDescription 
                        icon = { faExpandArrowsAlt }
                        description = 'Modifica la escala a lo ancho del modelo'
                    />
                </Column>
                <Column
                    mdBreakpoint = { 12 }
                    lgBreakpoint = { 6 }
                >
                    <AxisReference />
                </Column>
            </Row>
        </EditorSection>
    )
}

const ScaleModifierWithState = withProjectState(ScaleModifier);