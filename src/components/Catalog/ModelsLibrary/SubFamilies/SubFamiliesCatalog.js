import React, { Fragment } from 'react';
//Components
import LabelWithIcon from '../../../Layout/Labels/LabelWithIcon';
//HOC
import withFamilyState from '../../../../redux/HOC/withFamilyState';
import { faCubes } from '@fortawesome/free-solid-svg-icons';
import FlexColumn from '../../../Layout/Flex/FlexColumn';
import LinesCatalog from './Lines/LinesCatalog';

const SubFamiliesCatalog = ({ subFamilies }) => {
    return (
        <FlexColumn>
            { 
                subFamilies.map( subFamily => (
                    <Fragment
                        key = { subFamily.id_subFamiliaProducto }
                    >
                        <LabelWithIcon 
                            icon = { faCubes }
                            className = 'h6 text-light bg-secondary px-2 py-2 rounded-lg'
                            labelText = { subFamily.nombre_es }
                        />
                        <hr />
                        <LinesCatalog 
                            lines = { subFamily.lineas }
                        />
                    </Fragment>
                ))
            }
        </FlexColumn>
    )

}

let WithFamilyState = withFamilyState(SubFamiliesCatalog);
export default WithFamilyState;