import React from 'react';
//Components
import Catalog from '../../components/Catalog/Catalog';
import PDFGenerator from '../../components/PDFGenerator/PDFGenerator';
import ProjectSettings from '../../components/ProjectSettings/ProjectSettings';
import BidimensionalEditor from '../../components/Editor/2D/Editor/Editor';
import TridimensionalEditor from '../../components/Editor/3D/Layout/Editor/Editor';


//Sections
export const CATALOG                = 'CATALOG';    
export const PDF_GENERATION         = 'PDF_GENERATION';
export const PROJECT_SETTINGS       = 'PROJECT_SETTINGS';
export const BIDIMENSIONAL_EDITOR   = 'BIDIMENSIONAL_EDITOR';
export const TRIDIMENSIONAL_EDITOR  = 'TRIDIMENSIONAL_EDITOR';


export const SectionComponentToRender = {
    [CATALOG]: <Catalog />,
    [PDF_GENERATION]: <PDFGenerator />,
    [PROJECT_SETTINGS]: <ProjectSettings />,
    [BIDIMENSIONAL_EDITOR]: <BidimensionalEditor />,
    [TRIDIMENSIONAL_EDITOR]: <TridimensionalEditor />,
}