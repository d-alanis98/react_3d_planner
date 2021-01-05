import React, { useState, useEffect } from 'react';
import { v1 as uuidv1 } from 'uuid';
//Components
import Column from '../../../../../Layout/Grid/Column';
import NoProducts from './NoProducts';
import ProductDetails from './ProductDetails/ProductDetails';
import ModelThumbnail from '../../../../../Editor/3D/Layout/Editor/EditorActions/ModelThumbnail';
//HOC
import withFamilyState from '../../../../../../redux/HOC/withFamilyState';
import withProjectState from '../../../../../../redux/HOC/withProjectState';
import withEditorState from '../../../../../../redux/HOC/withEditorState';
//Constants
import { BIDIMENSIONAL_EDITOR } from '../../../../../../constants/sections/sections';
import { modelDirections, modelStates } from '../../../../../../constants/models/models';

const Products = ({ 
    project, 
    products, 
    addObject, 
    setEditorType, 
    getProductDoorStatus,
    canDoorBeOpenedOrClosed,
    modelHasRightOrLeftVariant,
    getProductInitialCoordinates
}) => {
    //PROPS
    //Destructuring
    const { objects: projectObjects } = project;

    //HOOKS
    //State
    const [models, setModels] = useState({});

    //Effects
    useEffect(() => {
        let existingModels = { };
        projectObjects.forEach(object => {
            let { type } = object;
            existingModels[type] ? existingModels[type].quantity++ : existingModels[type] = { quantity: 1 };
        });
        //We restore the already existing models in state
        setModels(existingModels);
    }, [])

    const addObjectToProject = (type, productLine, productKey) => {
        //We get initial values
        let doorStatus = getProductDoorStatus(type, productLine);
        let initialState = modelStates.closed;
        let initialDirection = modelDirections.left;
        let initialCoordinates = getProductInitialCoordinates(type, productLine);
        //We create the object structure
        let objectToAdd = {
            id: uuidv1(),
            type,
            doorStatus,
            productKey,
            productLine,
            modelState: initialState,
            modelDirection: initialDirection,
            canDoorBeOpenedOrClosed: canDoorBeOpenedOrClosed(productLine),
            modelHasRightOrLeftVariant: modelHasRightOrLeftVariant(productLine),
            '2d': {
                uuid: '', //We don´t know the id for the 2D model, it will be generated and updated on render time
                coordinates: { x: 0, y: 0 }
            },
            '3d': {
                uuid: '', //We don´t know the id for the 3D model, it will be generated and updated on render time
                coordinates: initialCoordinates,
            }
        }
        addObject(objectToAdd);
        let existingModels = { ...models };
        existingModels[type] ? existingModels[type].quantity++ : existingModels[type] = { quantity: 1 };
        setModels(existingModels);
        //We redirect to the 3D editor
        setEditorType(BIDIMENSIONAL_EDITOR);

    }

    if(!products || products.length === 0)
        return <NoProducts />

    return products.map( product => (
        <Column
            key = { `producto_${product.id_producto}` }
            lgBreakpoint = { 4 }
            mdBreakpoint = { 6 }
            fixedSize = { 12 }
            className = 'card rounded-lg border-muted mt-2'
        >

            <ModelThumbnail 
                title = { product.descripcion_es }
                model = { product }
                className = 'text-center pt-2'
                modelQuantity = { models[`${product.id_producto}`] ? models[`${product.id_producto}`].quantity : 0 }
            />
            <ProductDetails 
                product = { product }
                addObjectToProject = { addObjectToProject }
            />

        </Column>
    ));
}

//HOCS
let WithEditorState = withEditorState(Products);
let WithProjectState = withProjectState(WithEditorState);
let WithFamilyState = withFamilyState(WithProjectState);
//Decorated component
export default WithFamilyState;