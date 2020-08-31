import React, { useState, useEffect } from 'react';
//Components
import Column from '../../../../../Layout/Grid/Column';
import NoProducts from './NoProducts';
import ProductDetails from './ProductDetails/ProductDetails';
import ModelThumbnail from '../../../../../Editor/3D/Layout/Editor/EditorActions/ModelThumbnail';
//HOC
import withFamilyState from '../../../../../../redux/HOC/withFamilyState';
import withProjectState from '../../../../../../redux/HOC/withProjectState';

const Products = ({ project, products, addObject }) => {
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

    const addObjectToProject = (type, productLine) => {
        let objectToAdd = {
            id: projectObjects.length,
            type,
            productLine,
            '2d': {
                uuid: '', //We don´t know the id for the 2D model, it will be generated and updated on render time
                coordinates: { x: 0, y: 0 }
            },
            '3d': {
                uuid: '', //We don´t know the id for the 3D model, it will be generated and updated on render time
                coordinates: { x: 0, y: 0, z: 0 }
            }
        }
        addObject(objectToAdd);
        let existingModels = { ...models };
        existingModels[type] ? existingModels[type].quantity++ : existingModels[type] = { quantity: 1 };
        setModels(existingModels)
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
let WithProjectState = withProjectState(Products);
let WithFamilyState = withFamilyState(WithProjectState)
//Decorated component
export default WithFamilyState;