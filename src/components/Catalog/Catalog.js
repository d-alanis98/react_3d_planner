import React from 'react';
//Components
import FlexColumn from '../Layout/Flex/FlexColumn';
import ModelsLibrary from './ModelsLibrary/ModelsLibrary';
import LabelWithIcon from '../Layout/Labels/LabelWithIcon';
//HOC
import withFamilyState from '../../redux/HOC/withFamilyState';
//Icons
import { faBook, faTools } from '@fortawesome/free-solid-svg-icons';
import OtherModels from './OtherModels/OtherModels';
//Constants
const OTHER_MODELS_CATALOG = 'other_models_catalog';

const Catalog = ({ family }) => (
    <div className='container mt-3 text-center'>
        <CatalogHeader 
            family = { family } 
        />
        <ModelsLibrary />
        <hr />
        <OtherModels 
            catalogId = { OTHER_MODELS_CATALOG }
        />
    </div>
);

//We apply the family state HOC
let WithFamilyState = withFamilyState(Catalog);
//We export the decorated component
export default WithFamilyState;

const CatalogHeader = ({ family }) => (
    <FlexColumn
        className = 'align-items-center'
    >
        <LabelWithIcon 
            icon = { faBook }
            className = 'text-muted h4'
            labelText = { `Catálogo de familia ${ family.nombre_es }` }
        />
        <LabelWithIcon 
            icon = { faTools }
            onClick = { () => document.getElementById(OTHER_MODELS_CATALOG).scrollIntoView() }
            className = 'text-light h6 px-3 py-2 cursor-click rounded-pill bg-secondary'
            labelText = 'Ver catálogo de otros modelos'
        />
    </FlexColumn>
);