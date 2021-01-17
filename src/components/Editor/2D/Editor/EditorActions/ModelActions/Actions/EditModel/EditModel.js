import React, { useState, Fragment, useEffect } from 'react';
//Components
import EditModelMenu from './EditModelMenu/EditModelMenu';
import ActionWithIcon from '../ActionWithIcon/ActionWithIcon';
//Classes
import BidimensionalModelEditor from '../../../../../../../../classes/2D/Models/BidimensionalModelEditor';
//Icons
import { faCog } from '@fortawesome/free-solid-svg-icons';

const EditModel = ({ 
    rotate, 
    deleteModel,
    modelToEdit, 
    sceneInstance,
    correctSelectionBox 
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
                sceneInstance = { sceneInstance }
                correctSelectionBox = { correctSelectionBox }
                modelEditorInstance = { modelEditorInstance }
            />
        </Fragment>
    );
}

export default EditModel;

