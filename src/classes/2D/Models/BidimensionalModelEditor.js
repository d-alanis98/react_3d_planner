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
        this.originalDimensions = null;
    }

    editName = newName => {
        const [modelName] = this.modelToEdit.find('Text');
        if(!modelName || !modelName.attrs || !modelName.attrs.text)
            return;
        //We set the new name
        modelName.setAttr('text', newName);
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

    getNormalizedDimensions = ({ width, height, depth, scaleToApply }) => ({
        width: (Number(width) / 10) * Number(scaleToApply.x || 1),
        height: (Number(height) / 10) * Number(scaleToApply.y || 1),
        depth: (Number(depth) / 10) * Number(scaleToApply.z || 1)
    });

    setOriginalDimensions = (originalWidth, originalHeight, originalDepth) => {
        this.originalDimensions = {
            width: Number(originalWidth) / 10,
            height: Number(originalHeight) / 10,
            depth: Number(originalDepth) / 10
        };
    }

    getDimensionAxis = dimension => {
        switch(dimension) {
            case 'width':
                return 'x';
            case 'height':
                return 'y';
            case 'depth':
                return 'z';
            default:
                return 'x';
        }
    }

    getScaleToApply = ({ 
        value,
        dimension,
        existingScale
    }) => {
        let scaleX = Number(existingScale.x || 1);
        let scaleY = Number(existingScale.y || 1);
        let scaleZ = Number(existingScale.z || 1);
        switch(dimension) {
            case 'width':
                scaleX = Number(value) / this.originalDimensions.width; 
                break;
            case 'height':
                scaleY = Number(value) / this.originalDimensions.height;
                break;
            case 'depth':
                scaleZ = Number(value) / this.originalDimensions.depth;
                break;              
        }
        return {
            scaleX,
            scaleY,
            scaleZ
        }
    }

    getBoundsVisibility = () => {
        const existingBoundsVisibility = this.modelToEdit.getAttr(BoundsFactory.VISIBILITY_ATTR);
        return existingBoundsVisibility ? existingBoundsVisibility : BoundsFactory.INITIAL_BOUNDS_ATTRS;
    }

    setUpdatedBoundsVisibilityInAttrs = (boundId, visible) => {
        const updatedBoundsVisibility = this.getBoundsVisibility().map(bound => {
            return bound.id !== boundId 
                ? bound
                : {
                    ...bound,
                    visible
                } 
        });
        this.modelToEdit.setAttr(BoundsFactory.VISIBILITY_ATTR, updatedBoundsVisibility);
    }

    editBoundsVisibility = (bound, visible) => {
        BoundsFactory.toggleVisibility({ 
            bound,
            visible,
            modelId: this.modelToEdit._id,
            sceneInstance: this.sceneInstance
        });
        this.setUpdatedBoundsVisibilityInAttrs(bound, visible);
    }

}