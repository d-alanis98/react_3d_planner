import React from 'react';
//Components
import Flex from './Flex';

const FlexRow = ({ children, className, ...extraProps }) => (
    <Flex
        className = {`flex-row ${className || ''}`}
        { ...extraProps }
    >
        { children }
    </Flex>
);

export default FlexRow;