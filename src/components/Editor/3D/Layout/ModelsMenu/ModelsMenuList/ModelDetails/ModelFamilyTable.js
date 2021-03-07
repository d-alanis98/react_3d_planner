import React from 'react';
//HOC
import withFamilyState from '../../../../../../../redux/HOC/withFamilyState';

const ModelFamilyTable = ({ 
    modelType, 
    getProductKey,
    getProductName,
    modelProductLine
 }) => (
    <table
        className = 'models-menu-list__item-details-table mt-2'
    >
        <tbody>
            <tr>
                <th>Clave</th>
                <td>{ getProductKey(modelType, modelProductLine) }</td>
            </tr>
            <tr>
                <th>Producto</th>
                <td>{ 
                    getProductName(modelType, modelProductLine)
                        .split('')
                        .map((char, index) => (index === 0) ? char.toUpperCase() : char.toLowerCase())
                        .join('') 
                }</td>
            </tr>
        </tbody>
    </table>
);

export default withFamilyState(ModelFamilyTable);