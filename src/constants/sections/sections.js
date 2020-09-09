import React from 'react';
//Components
import ProjectSettings from '../../components/ProjectSettings/ProjectSettings';
import BidimensionalEditor from '../../components/Editor/2D/Editor/Editor';
import TridimensionalEditor from '../../components/Editor/3D/Layout/Editor/Editor';
import Catalog from '../../components/Catalog/Catalog';


//Sections
export const CATALOG                = 'CATALOG';    
export const PROJECT_SETTINGS       = 'PROJECT_SETTINGS';
export const BIDIMENSIONAL_EDITOR   = 'BIDIMENSIONAL_EDITOR';
export const TRIDIMENSIONAL_EDITOR  = 'TRIDIMENSIONAL_EDITOR';


export const SectionComponentToRender = {
    [CATALOG]: <Catalog />,
    [PROJECT_SETTINGS]: <ProjectSettings />,
    [BIDIMENSIONAL_EDITOR]: <BidimensionalEditor />,
    [TRIDIMENSIONAL_EDITOR]: <TridimensionalEditor />,
}