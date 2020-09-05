import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Components
import Container from '../../../../Layout/Containers/Container';
import FlexColumn from '../../../../Layout/Flex/FlexColumn';
import LabelWithIcon from '../../../../Layout/Labels/LabelWithIcon';
//Icons
import { faExclamation, faEye } from '@fortawesome/free-solid-svg-icons';


const SelectModelWarning = () => (
    <FlexColumn
        className = 'h-85-relative justify-content-center align-items-center'
    >
        <Container>
            <LabelWithIcon 
                icon = { faExclamation }
                labelText = 'Seleccione un modelo para editar'
                className = 'h6 text-muted'
            />
        </Container>
        <Container>
            <small className='text-muted'>
                Para seleccionar un modelo es necesario dar click en su nombre en el listado 
                de modelos en escena o en el ícono de <FontAwesomeIcon icon = { faEye } />
            </small>
        </Container>
    </FlexColumn>
);

export default SelectModelWarning;