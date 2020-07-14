import React from 'react';
import Flex from './Flex';

const FlexColumn = ({ children, className }) => (
    <Flex
        className = {`flex-column ${className || ''}`}
    >
        { children }
    </Flex>
);

export default FlexColumn;