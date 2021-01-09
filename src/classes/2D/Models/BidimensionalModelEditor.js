//Dependencies
import BoundsFactory from './BoundsFactory';
import BidimensionalModelFactory from './BidimensionalModelFactory';
//Constants
import { FRONT, FRONT_RIGHT, TOP } from '../../../constants/models/models';

export default class BidimensionalModelEditor {
    constructor(modelToEdit, sceneInstance) {
        this.modelToEdit = modelToEdit;
        this.sceneInstance = sceneInstance;
        this.originalWidth = this.modelToEdit.attrs.originalWidth;
        this.originalHeight = this.modelToEdit.attrs.originalHeight;
        this.previousScaleX = this.modelToEdit.attrs.previousScaleX || 1;
        this.previousScaleY = this.modelToEdit.attrs.previousScaleY || 1;
    }

    editName = newName => {
        const [modelName] = this.modelToEdit.find('Text');
        if(!modelName || !modelName.attrs || !modelName.attrs.text)
            return;
        //We get the name components (the name \n productLine)
        const modelNameComponents = modelName.attrs.text.split('\n');
        //We preserve the productLine
        const { 1: productLine } = modelNameComponents;
        //We set the new name
        modelName.setAttr('text', `${ newName } \n ${ productLine.trim() }`);
    }

    setScaleInX = scale => {
        let newWidth = this.originalWidth * scale;
        this.modelToEdit.width(newWidth);
        this.modelToEdit.offsetX(newWidth / 2);
        this.setScaleInXInGroupMembers(scale, newWidth);
    }

    setScaleInY = scale => {
        let newHeight = this.originalHeight * scale;
        this.modelToEdit.height(newHeight);
        this.modelToEdit.offsetY(newHeight / 2);
        this.setScaleInYInGroupMembers(scale, newHeight);
    }

    getGroupMembers = () => {
        const [modelImage, modelName] = this.modelToEdit.children;
        return { modelImage, modelName };
    }

    setScaleInXInGroupMembers = (scale, newWidth) => {
        const { modelImage, modelName } = this.getGroupMembers();
        let scaleToApplyToName = scale / this.previousScaleX;
        modelName.scaleX(scaleToApplyToName);
        modelImage.width(newWidth);
        this.modelToEdit.setAttr('previousScaleX', scaleToApplyToName);
    }

    setScaleInYInGroupMembers = (scale, newHeight) => {
        const { modelImage, modelName } = this.getGroupMembers();
        let scaleToApplyToName = scale / this.previousScaleY;
        modelName.scaleY(scaleToApplyToName);
        modelImage.height(newHeight);
        this.modelToEdit.setAttr('previousScaleY', scaleToApplyToName);
    }

    editScale = (axis, scale = 1, editorView) => {
        switch(editorView) {
            case TOP:
                if(axis === 'x')
                    this.setScaleInX(scale);
                if(axis === 'z')
                    this.setScaleInY(scale);
                break;
            case FRONT:
                if(axis === 'x')
                    this.setScaleInX(scale);
                if(axis === 'y')
                    this.setScaleInY(scale);
                break;
            case FRONT_RIGHT:
                if(axis === 'z')
                    this.setScaleInX(scale);
                if(axis === 'y')
                    this.setScaleInY(scale);
                break;
        }
        //We update the dragbound function (for room bound detection)
        BidimensionalModelFactory.setUpdatedDragBoundFunc(this.modelToEdit, this.sceneInstance);
        //We refresh the bounds
        BoundsFactory.refreshModelBounds(this.modelToEdit, this.sceneInstance);
    }

}