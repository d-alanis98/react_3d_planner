import React from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../../../../Layout/Labels/LabelWithIcon';
//Styles
import '../ModelsMenu.css';
//Icons
import { faEdit, faCrosshairs, faEyeSlash, faTrash, faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
//Classes
import TridimensionalRenderer from '../../../../../../classes/Renderers/TridimensionalRenderer';
import ButtonWithIcon from '../../../../../Layout/Buttons/ButtonWithIcon';
import FlexColumn from '../../../../../Layout/Flex/FlexColumn';

const ModelsMenuListItem = ({ editModel, isFocused, focusModel, deleteModel, rotateModel, projectModel }) => {
    //CONSTANTS
    const { TRIDIMENSIONAL_SCENE } = TridimensionalRenderer;
    const project3DModel = projectModel[TRIDIMENSIONAL_SCENE];

    return (
        <li 
            className = 'models-menu-list__item shadow'
        >
            <FlexRow
                className = 'justify-content-around align-items-center flex-wrap'
            >
                <FlexColumn
                    className = 'align-items-center'
                >
                    <img 
                        className = 'models-menu__thumbnail mb-1'
                        src = { `https://dev.qpr.mx/api/productos/lineas/${projectModel.productLine}/getPic?small=true` }
                    />
                    <FlexRow
                        className = 'align-items-center flex-wrap'
                    >
                        <ButtonWithIcon
                            icon = { faRedo }
                            type = 'outline-secondary'
                            onClick = { event => rotateModel(project3DModel.uuid, -90) }
                            className = 'rounded-pill py-2 px-2 mr-2'
                            iconClassName = 'mr-0'
                        />
                        <ButtonWithIcon 
                            icon = { faUndo }
                            type = 'outline-secondary'
                            onClick = { event => rotateModel(project3DModel.uuid, 90) }
                            className = 'rounded-pill py-2 px-2'
                            iconClassName = 'mr-0'
                        />
                    </FlexRow>
                </FlexColumn>
                <LabelWithIcon 
                    id = { project3DModel.uuid }
                    icon = { isFocused(project3DModel) ? faEyeSlash : faCrosshairs }
                    onClick = { focusModel }
                    className = 'h5 text-muted cursor-click'
                />
                <LabelWithIcon 
                    id = { project3DModel.uuid }
                    icon = { faEdit }
                    onClick = { editModel }
                    className = 'h5 text-primary cursor-click'
                />
                <LabelWithIcon 
                    id = { project3DModel.uuid }
                    icon = { faTrash }
                    onClick = { deleteModel }
                    className = 'h5 text-danger cursor-click'
                />
            </FlexRow>

        </li>
    );
}

export default ModelsMenuListItem;