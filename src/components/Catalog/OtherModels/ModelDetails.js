import React from 'react';
//Components
import Column from '../../Layout/Grid/Column';
import ButtonWithIcon from '../../Layout/Buttons/ButtonWithIcon';
//Styles
import '../../Editor/3D/Layout/Editor/EditorActions/ModelThumbnail.css';
//Icons
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const ModelDetails = ({ 
    model,
    addModel,
    modelQuantity, 
}) => (
    <Column
        lgBreakpoint = { 4 }
        mdBreakpoint = { 6 }
        fixedSize = { 12 }
        className = 'card rounded-lg border-muted mt-2'
    >
        <ModelThumbnail 
            title = { model.name }
            modelQuantity = { modelQuantity }
        />
        <table className='table table-sm table-borderless text-center'>
            <tbody>
                <tr>
                    <th>Nombre </th>
                    <td>{ model.name }</td>
                </tr>
                <tr>
                    <th colSpan='2'>
                        <ButtonWithIcon 
                            id = { `${model.id_extra}` }
                            icon = { faPlusCircle }
                            onClick = { () => addModel(model.id_extra) }
                            className = 'btn btn-primary rounded-lg shadow'
                            buttonText = 'Agregar'
                        />
                    </th>
                </tr>
            </tbody>
        </table>
    </Column>
);

export default ModelDetails;



const ModelThumbnail = ({ 
    title, 
    modelQuantity
}) => {

    return(
        <div 
            title = { title }
            className = 'model-thumbnail-container cursor-click text-center pt-2'
            data-toggle = 'tooltip' 
            data-placement = 'right' 
        >
            <img 
                alt = { title }
                src = 'logo512.png' 
                className = 'model-thumbnail'
            />
            {
                modelQuantity > 0 && 
                <div className='quantity-tile'>
                    <span className='rounded-circle bg-primary circle-tile text-light'>{ modelQuantity }</span>
                </div>
            }
        </div>
    );
}