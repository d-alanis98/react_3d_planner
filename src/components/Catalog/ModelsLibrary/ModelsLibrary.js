import React, { useState, useEffect } from 'react';
//Components
import Flex from '../../Layout/Flex/Flex';
//Data
import data from '../Data/data';
import ModelThumbnail from '../../Editor/3D/Layout/Editor/EditorActions/ModelThumbnail';
import ButtonWithIcon from '../../Layout/Buttons/ButtonWithIcon';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
//Styles
import './ModelsLibrary.css';
import withProjectState from '../../../redux/HOC/withProjectState';

const ModelsLibrary = ({ project, addObject }) => {
    //PROPS
    //Destructuring
    const { objects: projectObjects } = project;

    //HOOKS
    //State
    const [models, setModels] = useState({});

    //Effects
    useEffect(() => {
        let modelsCopy = { ...models };
        projectObjects.forEach(model => {
            const { type } = model;
            modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
        });
        setModels(modelsCopy);
    }, [])
    //Methods
    const addObjectToProject = type => {
        let objectToAdd = {
            id: projectObjects.length,
            type,
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
        let modelsCopy = { ...models };
        modelsCopy[type] ? modelsCopy[type].quantity++ : modelsCopy[type] = { quantity: 1 };
        setModels(modelsCopy)

    }



    return (
        <Flex
            className = 'justify-content-around align-items-between flex-wrap'
        >
            {
                data.map(item => (
                    <div
                        className = 'card rounded-lg border-muted catalog-tile mt-3'
                    >
                        <div className='card-body px-2 py-2'>
                            <table className='table table-sm table-borderless'>
                                <thead>
                                    <tr>
                                        <th colSpan='2'>
                                            <ModelThumbnail 
                                                model = { item.model_id }
                                                title = { item.name }
                                                className = 'mr-3 mt-3'
                                                modelQuantity = { models[item.model_id] ? models[item.model_id].quantity : 0}
                                                imageClassName = 'catalog-thumbnail'
                                            />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Nombre</th>
                                        <td>{ item.name }</td>
                                    </tr>
                                    <tr>
                                        <th>Descripción</th>
                                        <td>{ item.description }</td>
                                    </tr>
                                    <tr>
                                        <th colSpan='2'>
                                            <ButtonWithIcon 
                                                id = { item.model_id }
                                                icon = { faPlusCircle }
                                                onClick = { event => addObjectToProject(item.model_id) }
                                                className = 'btn btn-primary rounded-lg shadow'
                                                buttonText = 'Agregar'
                                            />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }

        </Flex>
    )
}

let WithProjectState = withProjectState(ModelsLibrary);

export default WithProjectState;