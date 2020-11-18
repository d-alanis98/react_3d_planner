import React from 'react';

const ModelState = ({ 
    modelId,
    modelState, 
    modelDirection, 
    handleStateChange, 
    handleDirectionChange 
}) => {
    return (
        <table
            className = 'table table-sm table-borderless'
        >
            <tbody>
                <tr>
                    <th className='text-white'>Estado: </th>
                    <td>
                        <select 
                            value = { modelState }
                            onChange = { event => handleStateChange(event, modelId) }
                            className = 'position-modifier__input' 
                        >                       
                            <option value='O'>Abierto</option>
                            <option  value='C'>Cerrado</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th  className='text-white'>Direccion: </th>
                    <td>
                        <select 
                            value = { modelDirection }
                            onChange = { event => handleDirectionChange(event, modelId) }
                            className = 'position-modifier__input' 
                        >
                            <option value='I'>Izquierda</option>
                            <option  value='D'>Derecha</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ModelState;