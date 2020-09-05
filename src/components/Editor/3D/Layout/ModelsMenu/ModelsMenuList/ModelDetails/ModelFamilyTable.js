import React from 'react';

const ModelFamilyTable = ({ modelType, modelProductLine }) => (
    <table
        className = 'models-menu-list__item-details-table'
    >
        <tbody>
            <tr>
                <th>Tipo</th>
                <td>{ modelType }</td>
            </tr>
            <tr>
                <th>Linea de producto</th>
                <td>{ modelProductLine }</td>
            </tr>
        </tbody>
    </table>
);

export default ModelFamilyTable;