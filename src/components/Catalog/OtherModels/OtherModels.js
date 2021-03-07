import React, { useEffect, useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
//Components
import Row from '../../Layout/Grid/Row';
import NoProducts from '../ModelsLibrary/SubFamilies/Lines/Products/NoProducts';
import ModelDetails from './ModelDetails';
import SpinnerLoader from '../../Layout/Loaders/SpinnerLoader/SpinnerLoader';
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';
//HOC
import withEditorState from '../../../redux/HOC/withEditorState';
import withFamilyState from '../../../redux/HOC/withFamilyState';
import withProjectState from '../../../redux/HOC/withProjectState';
//Icons
import { faTools } from '@fortawesome/free-solid-svg-icons';
//Constants
import { BIDIMENSIONAL_EDITOR } from '../../../redux/reducers/editorDuck';
import { modelDirections, modelStates } from '../../../constants/models/models';


const OtherModels = ({
    project: { otherObjects: projectObjects },
    catalogId,
    otherObjects,
    setEditorType,
    addMiscObject,
    getMiscObjectById,
    fetchingOtherObjects,
    getMiscObjectInitialCoordinates
}) => {
    //HOOKS
    //State
    const [modelsQuantities, setModelsQuantities] = useState({ });
    //Effects
    useEffect(() => {
        //We set the local quantities for badge pill display
        setQuantities(projectObjects, setModelQuantitiesInState);
    }, [projectObjects])

    const setModelQuantitiesInState = modelsQuantities => setModelsQuantities(modelsQuantities);

    const addMiscObjectToProjectState = modelId => {
        let model = getMiscObjectById(modelId);
        let doorStatus = '0,w';
        let initialState = modelStates.closed;
        let initialDirection = modelDirections.left;
        let initialCoordinates = getMiscObjectInitialCoordinates(modelId);
        addMiscObject({
            id: uuidv1(),
            modelId,
            modelName: model.name,
            doorStatus,
            modelState: initialState,
            modelDirection: initialDirection,
            canDoorBeOpenedOrClosed: false,
            modelHasRightOrLeftVariant: false,
            '2d': {
                uuid: '', //We don´t know the id for the 2D model, it will be generated and updated on render time
                coordinates: { x: 0, y: 0 }
            },
            '3d': {
                uuid: '', //We don´t know the id for the 3D model, it will be generated and updated on render time
                coordinates: initialCoordinates,
            }
        });
        //We redirect to the 3D editor
        setEditorType(BIDIMENSIONAL_EDITOR);
    }

    //Render
    if(fetchingOtherObjects)
        return (
            <SpinnerLoader 
                loading = { fetchingOtherObjects } 
                loaderText = 'Obteniendo objetos extra' 
            />
        )

    return (
        <CatalogContainer
            catalogId = { catalogId }
        >
            <CatalogHeader />
            <Models
                models = { otherObjects }
                addModel = { addMiscObjectToProjectState }
                modelsQuantities = { modelsQuantities }
            />
        </CatalogContainer>
    );
}

let WithEditorState = withEditorState(OtherModels);
let WithFamilyState = withFamilyState(WithEditorState);
let WithProjectState = withProjectState(WithFamilyState);

export default WithProjectState;

const CatalogContainer = ({ children, catalogId }) => (
    <div 
        id = { catalogId }
        className = 'd-flex flex-column align-items-center pb-3'
    >
        { children }
    </div>
);

const CatalogHeader = () =>             
    <LabelWithIcon 
        icon = { faTools }
        className = 'h5 text-muted'
        labelText = 'Catálogo de otros modelos'
    />;

const Models = ({ 
    models,
    addModel,
    modelsQuantities 
}) => {
    if(models.length === 0)
        return <NoProducts />
    return (
        <Row>
            {
                models.map(model => (
                    <ModelDetails 
                        key = { model.id_extra }
                        model = { model }
                        addModel = { addModel }
                        modelQuantity = { modelsQuantities[model.id_extra] || 0 }
                    />
                ))
            }   
        </Row>
    );
}


//Functions
const fetchModels = (handleSuccess, handleError) => {
    fetch(`${process.env.MIX_APP_API_ENDPOINT}/3d_editor/extras`)
    .then(response => {
        if(response.status === 200)
            response.json()
                .then(handleSuccess);
        else throw new Error(response.statusText);
    })
    .catch(handleError);
}

const setQuantities = (models, handler) => {
    let ocurrences = { };
    models.forEach(({ modelId }) => 
        ocurrences[modelId] = ocurrences[modelId] ? ++ocurrences[modelId] : 1
    );
    handler && handler(ocurrences);
}