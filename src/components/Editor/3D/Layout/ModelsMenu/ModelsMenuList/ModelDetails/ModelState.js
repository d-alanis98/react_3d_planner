import React from 'react';
//Constants
import { modelDirections, modelStates } from '../../../../../../../constants/models/models';

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
                            <option 
                                value = { modelStates.open } 
                            >
                                Abierto
                            </option>
                            <option  
                                value = { modelStates.closed }
                            >
                                Cerrado
                            </option>
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
                            <option 
                                value = { modelDirections.left } 
                            >
                                Izquierda
                            </option>
                            <option  
                                value = { modelDirections.right } 
                            >
                                Derecha
                            </option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default ModelState;