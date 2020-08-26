import React from 'react';
//Componentes
import FlexRow from '../../../../../Layout/Flex/FlexRow';

const NoProducts = () => (
    <FlexRow
        className = 'justify-content-center align-items-center'
    >
        <h6 className='text-muted'>
            Sin productos...
        </h6>
    </FlexRow>
);

export default NoProducts;