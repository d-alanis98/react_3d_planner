import React from 'react';
//Components
import ModelsLibrary from './ModelsLibrary/ModelsLibrary';
import LabelWithIcon from '../Layout/Labels/LabelWithIcon';
//HOC
import withFamilyState from '../../redux/HOC/withFamilyState';
//Icons
import { faBook } from '@fortawesome/free-solid-svg-icons';

const Catalog = ({ family }) => (
    <div className='container mt-3 text-center'>
        <LabelWithIcon 
            icon = { faBook }
            className = 'text-muted h4'
            labelText = { `Catálogo de familia ${ family.nombre_es }` }
        />
        <ModelsLibrary 
            models = {{}}
        />
    </div>
);

//We apply the family state HOC
let WithFamilyState = withFamilyState(Catalog);
//We export the decorated component
export default WithFamilyState;

