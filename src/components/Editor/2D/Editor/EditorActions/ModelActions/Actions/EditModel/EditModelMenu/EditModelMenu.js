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
import { VisibilityModifier } from '../../../../ModelsList/ModelsList';
//HOC
import withProjectState from '../../../../../../../../../redux/HOC/withProjectState';
//Classes
import BoundsFactory from '../../../../../../../../../classes/2D/Models/BoundsFactory';
//Style
import './EditModelMenu.css';
//Icons
import { faArrowDown, faArrowLeft, faArrowRight, faArrowsAltH, faArrowsAltV, faArrowUp, faCrop, faExpandArrowsAlt, faEye, faEyeSlash, faTools, faTrash } from '@fortawesome/free-solid-svg-icons';






const EditModelMenu = ({ 
    rotate,
    toggleMenu,
    deleteModel,
    modelToEdit,
    showEditMenu,
    sceneInstance,
    correctSelectionBox,
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
            sceneInstance = { sceneInstance }
            correctSelectionBox = { correctSelectionBox }
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
    sceneInstance,
    correctSelectionBox,
    modelEditorInstance
}) => {

    const handleNameUpdate = newName => {
        modelEditorInstance.editName(newName);
        modelToEdit.name(newName);
    }

    const handleVisibilityChange = visible => {
        if(visible)
            correctSelectionBox();
        else correctSelectionBox(true); //To hide selection box
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
                modelToEdit = { modelToEdit }
                sceneInstance = { sceneInstance }
                handleVisibilityChange = { handleVisibilityChange }
            />
            <NameModifier 
                modelToEdit = { modelToEdit }
                isFor2DModel
                onNameUpdate = { handleNameUpdate }
            />
            <ScaleModifierWithState 
                modelToEdit = { modelToEdit }
                correctSelectionBox =  { correctSelectionBox }
                modelEditorInstance = { modelEditorInstance }
            />
            <EditModelBoundsWithState
                modelToEdit = { modelToEdit }
                modelEditorInstance = { modelEditorInstance }
            />
        </div>
    );
}

const QuickActions = ({ 
    rotate, 
    deleteModel, 
    modelToEdit,
    sceneInstance,
    handleVisibilityChange 
}) => (
    <Fragment>
        <LabelWithIcon 
            icon = { faTools }
            className = 'text-light mb-0'
            labelText = 'Acciones rápidas'
        />
        <FlexRow
            className = 'align-items-center justify-content-around mb-2 p-2'
        >
            <VisibilityModifier 
                model = { modelToEdit }
                onStateChange = { handleVisibilityChange }
                sceneInstance = { sceneInstance }
                withCircularIcon
            />
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
    correctSelectionBox,
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
        correctSelectionBox();
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

const EditModelBounds = ({
    modelToEdit,
    updateObject,
    modelEditorInstance,
    findObjectBy2DModelId
}) => {

    const [bounds, setBounds] = useState(boundsData);

    useEffect(() => {
        if(!modelToEdit || isEmptyObject(modelToEdit))
            return;
        const restoreVisibilityFromState = () => {
            const projectObject = findObjectBy2DModelId(modelToEdit._id);
            if(!projectObject || !projectObject['2d'] || !modelEditorInstance)
                return;
            const visibilityData = projectObject['2d'].boundsVisibility;
            if(!visibilityData)
                return;
            visibilityData.forEach(bound => {
                setBoundVisibility(bound.id, bound.visible)
            });
            //We set the bounds in local state
            setBounds(bounds.map((bound, index) => ({
                ...bound,
                visible: visibilityData[index].visible
            })));
        }

        restoreVisibilityFromState();
        
    }, [modelToEdit, modelEditorInstance]);


    const updateInGeneralState = bounds => {
        const getBoundsWithDataToKeepInState = () => (
            bounds.map(bound => ({
                id: bound.id,
                visible: isBoundVisible(bound)
            }))
        );
        //We update the bound state in the global store
        const projectObject = findObjectBy2DModelId(modelToEdit._id);
        if(!projectObject || !projectObject['2d'])
            return;
        const boundsWithDataToKeepInState = getBoundsWithDataToKeepInState();
        const projectObjectBidimensionalData = projectObject['2d'];
        const updatedObject = {
            ...projectObject,
            '2d': {
                ...projectObjectBidimensionalData,
                boundsVisibility: boundsWithDataToKeepInState,
            }
        }
        updateObject(updatedObject);
    }


    const isBoundVisible = bound => bound.visible !== undefined ? bound.visible : true;

    const getBoundsWithVisibilityChange = (boundId, visible) => (
        bounds.map(bound => {
            return bound.id !== boundId
                ? bound
                : {
                    ...bound,
                    visible,
                }
        })
    );

    const setBoundVisibility = (boundId, visible) => {
        modelEditorInstance.editBoundsVisibility(boundId, visible);
        setBounds(getBoundsWithVisibilityChange(boundId, visible));
    }

    const toggleBoundVisibility = boundId => {
        const boundToToggle = bounds.find(bound => bound.id === boundId);
        if(!boundToToggle)
            return;
        updateInGeneralState(getBoundsWithVisibilityChange(boundId, !isBoundVisible(boundToToggle)))
        setBoundVisibility(boundId, !isBoundVisible(boundToToggle));
        
    }

    return (
        <EditorSection
            targetId = 'model_bounds_modifier'
            sectionIcon = { faArrowsAltH }
            sectionName = 'Visibilidad de las cotas'
        > 
            <ul className='edit-bounds-visibility__list'>
                {
                    bounds.map(bound => (
                        <EditModelBoundsItem 
                            key = { bound.id }
                            icon = { bound.icon }
                            visible = {  isBoundVisible(bound) }
                            boundId = { bound.id }
                            boundName = { bound.name }
                            toggleBoundVisibility = { toggleBoundVisibility }
                        />
                    ))
                }
            </ul>
        </EditorSection>
    );
}

const EditModelBoundsWithState = withProjectState(EditModelBounds);

const EditModelBoundsItem = ({ 
    icon, 
    visible, 
    boundId,
    boundName,
    toggleBoundVisibility
}) => {

    const getIcon = () => visible ? faEyeSlash : faEye;

    const getLabelText = () => visible ? 'Ocultar' : 'Mostrar';

    return (
        <li
            onClick = { () => toggleBoundVisibility(boundId) }
        >
            <LabelWithIcon 
                icon = { getIcon() }
                className = 'cursor-click mb-0  mr-2' 
                labelText = { getLabelText() }
            />
            <LabelWithIcon 
                icon = { icon }
                labelText = { `(Cota ${ boundName })` }
                className = 'mb-0 cursor-click text--medium'
            />
        </li>
    );
}

//DATA
const boundsData = [
    {
        id: BoundsFactory.RIGHT_BOUND,
        icon: faArrowRight,
        name: 'derecha'
    },
    {
        id: BoundsFactory.LEFT_BOUND,
        icon: faArrowLeft,
        name: 'izquierda'
    },
    {
        id: BoundsFactory.TOP_BOUND,
        icon: faArrowUp,
        name: 'superior'
    },
    {
        id: BoundsFactory.BOTTOM_BOUND,
        icon: faArrowDown,
        name: 'inferior'
    }
];