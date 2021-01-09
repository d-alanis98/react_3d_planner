import React, { useState, Fragment, useEffect } from 'react';
//Components
import EditModelMenu from './EditModelMenu/EditModelMenu';
import ActionWithIcon from '../ActionWithIcon/ActionWithIcon';
//Icons
import { faCog } from '@fortawesome/free-solid-svg-icons';
import BidimensionalModelEditor from '../../../../../../../../classes/2D/Models/BidimensionalModelEditor';

const EditModel = ({ 
    rotate, 
    deleteModel,
    modelToEdit, 
    sceneInstance 
}) => {
    const [showEditMenu, setShowEditMenu] = useState(false);
    const [modelEditorInstance, setModelEditorInstance] = useState();

    const toggleMenu = () => {
        setShowEditMenu(previousValue => !previousValue)
    }

    useEffect(() => {
        if(!modelToEdit)
            return;
        let modelEditorInstance = new BidimensionalModelEditor(modelToEdit, sceneInstance);
        setModelEditorInstance(modelEditorInstance);
    }, [modelToEdit, sceneInstance]);

    return (
        <Fragment>
            <ActionWithIcon 
                icon = { faCog }
                onClick = { toggleMenu }
            />
            <EditModelMenu 
                rotate = { rotate }
                toggleMenu = { toggleMenu }
                deleteModel = { deleteModel }
                modelToEdit = { modelToEdit }
                showEditMenu =  { showEditMenu }
                modelEditorInstance = { modelEditorInstance }
            />
        </Fragment>
    );
}

export default EditModel;

