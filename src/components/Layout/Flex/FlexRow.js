import React from 'react';
//Componentes
import Flex from './Flex';

const FlexRow = ({ children, className, }) => (
    <Flex
        className = {`flex-row ${className || ''}`}
    >
        { children }
    </Flex>
);

export default FlexRow;