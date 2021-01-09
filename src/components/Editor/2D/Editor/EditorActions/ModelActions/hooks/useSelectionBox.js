import Konva from 'konva';
import { useState, useEffect } from 'react';

const useSelectionBox = (modelToEdit, sceneInstance) => {
    const [selectionBox, setSelectionBox] = useState();

    useEffect(() => {
        if(!modelToEdit) {
            if(!selectionBox)
                return;
            hideSelectionBox();
        }
        else showSelectionBox();

    }, [modelToEdit]);

    //Clean up
    useEffect(() => () => {
        selectionBox && selectionBox.destroy()
    }, [selectionBox])

    useEffect(() => {
        if(!sceneInstance || !selectionBox)
            return;
        sceneInstance.planeLayer.add(selectionBox);
    }, [selectionBox]);


    const showSelectionBox = () => {
        if(!modelToEdit)
            return;
        let selectionBox = new Konva.Rect({
            x: modelToEdit.attrs.x,
            y: modelToEdit.attrs.y,
            width: modelToEdit.attrs.width,
            height: modelToEdit.attrs.height,
            stroke: '#90e0ef',
            offsetX: modelToEdit.attrs.offsetX,
            offsetY: modelToEdit.attrs.offsetY,
            strokeWidth: 5,
            name: 'selectionBox'
        });
        if(modelToEdit.attrs.rotation)
            selectionBox.rotate(modelToEdit.attrs.rotation);
        setSelectionBox(selectionBox);
    }

    const hideSelectionBox = () => {
        if(!sceneInstance)
            return;
        sceneInstance.planeLayer.children.forEach(item => {
            if(item.attrs.name === 'selectionBox') {
                item.remove();
            }
        });
        if(selectionBox)
            selectionBox.remove();
        setSelectionBox(null);
    }

    const correctSelectionBox = (justHideSelectionBox = false) => {
        hideSelectionBox();
        if(!justHideSelectionBox)
            showSelectionBox();
    }

    return correctSelectionBox;
}

export default useSelectionBox;