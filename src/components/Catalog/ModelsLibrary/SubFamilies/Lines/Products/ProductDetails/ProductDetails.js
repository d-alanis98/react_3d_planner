import React from 'react';
//Components
import ButtonWithIcon from '../../../../../../Layout/Buttons/ButtonWithIcon';
//Icons
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ProductDetails = ({ product, addObjectToProject }) => {
    //Product destructuring 
    const { alto, ancho, fondo, id_producto, id_lineaProducto, descripcion_es } = product;
    return (
        <table className='table table-sm table-borderless text-center'>
            <tbody>
                <tr>
                    <th>Nombre </th>
                    <td>{ descripcion_es }</td>
                </tr>
                <tr>
                    <th colSpan='2'>Dimensiones</th>
                </tr>
                <tr>
                    <th>Alto</th>
                    <td> { alto / 10 } cm</td>
                </tr>
                <tr>
                    <th>Ancho</th>
                    <td> { ancho / 10 } cm</td>
                </tr>
                <tr>
                    <th>Fondo</th>
                    <td> { fondo / 10 } cm</td>
                </tr>
                <tr>
                    <th colSpan='2'>
                        <ButtonWithIcon 
                            id = { `${id_producto}` }
                            icon = { faPlusCircle }
                            onClick = { event => addObjectToProject(id_producto, id_lineaProducto) }
                            className = 'btn btn-primary rounded-lg shadow'
                            buttonText = 'Agregar'
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    );
}

export default ProductDetails;