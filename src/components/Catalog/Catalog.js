import React, { Fragment } from 'react';
import LabelWithIcon from '../Layout/Labels/LabelWithIcon';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import ModelsLibrary from './ModelsLibrary/ModelsLibrary';

const Catalog = () => (
    <div className='container mt-3 text-center'>
        <LabelWithIcon 
            icon = { faBook }
            className = 'text-muted h4'
            labelText = 'Catálogo de productos'
        />
        <ModelsLibrary 
            models = {{}}
        />
    </div>
);

export default Catalog;

