import React from 'react';
import Flex from './Flex';

const FlexColumn = ({ children, className, ...extraProps }) => (
    <Flex
        className = {`flex-column ${className || ''}`}
        { ...extraProps }
    >
        { children }
    </Flex>
);

export default FlexColumn;