import React from 'react';
import FlexRow from '../../../../../../Layout/Flex/FlexRow';
import ModelThumbnail from '../ModelThumbnail';

const ModelsLibrary = ({ models, addModel }) => (
    <FlexRow
        className = 'justify-content-start pt-2'
    >
        <ModelThumbnail
            model = 'TABLE'
            title = 'Mesa'
            onClick = { (e) => addModel('TABLE') }
            className = 'mr-3'
            modelQuantity = { models['TABLE'] ? models['TABLE'].quantity : 0 }
        />
        <ModelThumbnail
            model = 'KIOSK'
            title = 'Kiosko'
            onClick = { (e) => addModel('KIOSK') }
            className = 'mr-3'
            modelQuantity = { models['KIOSK'] ? models['KIOSK'].quantity : 0 }
        />
        <ModelThumbnail
            model = 'BOARD'
            title = 'Pizarrón'
            onClick = { (e) => addModel('BOARD') }
            className = 'mr-3'
            modelQuantity = { models['BOARD'] ? models['BOARD'].quantity : 0 }
        />
        <ModelThumbnail 
            model = 'FURNITURE'
            title = 'Entrepaños'
            onClick = { (e) => addModel('FURNITURE') }
            className = 'mr-3'
            modelQuantity = { models['FURNITURE'] ? models['FURNITURE'].quantity : 0 }
        />
    </FlexRow>
);

export default ModelsLibrary;