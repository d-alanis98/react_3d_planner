import Konva from "konva";
//Classes
import BidimensionalModelRotation from "./BidimensionalModelRotation";

export default class BoundsFactory {
    //Constants
    //Bounds
    static TOP_BOUND    = 'TOP_BOUND';
    static LEFT_BOUND   = 'LEFT_BOUND';
    static RIGHT_BOUND  = 'RIGHT_BOUND';
    static BOTTOM_BOUND = 'BOTTOM_BOUND';
    //Others
    static TEXT_MARGIN          = 12;
    static VISIBILITY_ATTR      = 'boundsVisibility';
    static INITIAL_BOUNDS_ATTRS = [{id: BoundsFactory.RIGHT_BOUND}, {id: BoundsFactory.LEFT_BOUND}, {id: BoundsFactory.TOP_BOUND}, {id: BoundsFactory.BOTTOM_BOUND}]

    constructor(model, scene) {
        this.model = model;
        this.scene = scene;
        this.setRequiredData();
    }

    setRequiredData = () => {
        this.setDataFromScene();
        this.setDataFromModel();
        this.setBoundToCreateArray();

    }

    setDataFromScene = () => {
        const { 
            roomWidth,
            roomHeight,
            containerWidth,
            containerHeight,
            roomCoordinates: { finalX, finalY, initialX, initialY },
            roomDimensionInPixels: {
                width: roomWidthInPixels, 
                height: roomHeightInPixels
            } 
        } = this.scene;
        //Room X and Y dimensions (in meters)
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        //Room relevant points (in pixels)
        this.roomFinalX = finalX;
        this.roomFinalY = finalY;
        this.roomInitialX = initialX;
        this.roomInitialY = initialY;
        this.roomWidthInPixels = roomWidthInPixels;
        this.roomHeightInPixels = roomHeightInPixels;
        //We calculate padding
        this.roomPaddingInX = (containerWidth - roomWidthInPixels) / 2;
        this.roomPaddingInY = (containerHeight - roomHeightInPixels) / 2;
    }

    setDataFromModel = () => {
        const { attrs: { x, y }, _id: modelId } = this.model;
        let { modelWidth, modelHeight } = BidimensionalModelRotation.getWidthAndHeightBasedOnRotation(this.model);
        this.modelX = x;
        this.modelY = y;
        this.modelId = modelId;
        this.modelWidth = modelWidth;
        this.modelHeight = modelHeight;
    }

    setBoundToCreateArray = () => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        //We create the bound array with data (boundName: distance)
        const boundsArray = [TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND];
        this.boundsToCreate = boundsArray.map(bound => ({
            [bound]: this.getBoundDistance(bound)
        }));
    }

    getBoundId = boundData => {
        const boundName = this.getBoundName(boundData);
        return `${this.modelId}_${boundName}`;
    }

    getBoundName = boundData => {
        const [boundName] = Object.keys(boundData);
        return boundName;
    }


    getBoundDistance = side => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        let distance = 0;
        let widthPadding = this.modelWidth / 2;
        let heightPadding = this.modelHeight / 2;
        let roomWidthInCentiMeters = this.roomWidth * 100;
        let roomHeightInCentiMeters = this.roomHeight * 100;
        let roomWidthRatio = roomWidthInCentiMeters / this.roomWidthInPixels;
        let roomHeightRatio = roomHeightInCentiMeters / this.roomHeightInPixels;
        switch(side) {
            case TOP_BOUND:
                distance = this.modelY - heightPadding - this.roomInitialY;
                distance *= roomHeightRatio;
                break;
            case LEFT_BOUND:
                distance = this.modelX - widthPadding - this.roomInitialX;
                distance *= roomWidthRatio;
                break;
            case RIGHT_BOUND:
                distance = this.roomFinalX - this.modelX - widthPadding;
                distance *= roomWidthRatio
                break;
            case BOTTOM_BOUND:
                distance = this.roomFinalY - this.modelY - heightPadding;
                distance *= roomHeightRatio;
                break;
        }
        //Decimal correction, if it has decimal part, we only take 2 decimals
        distance = distance % 1 === 0 ? distance : distance.toFixed(2);
        return `${distance} cm`;
    }

    getBoundCoordinates = boundData => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        const bound = this.getBoundName(boundData);
        let x = 0, y = 0;
        switch(bound) {
            case TOP_BOUND:
                x = this.modelX;
                y = this.modelY - (this.modelHeight / 2);
                break;
            case LEFT_BOUND:
                x = this.modelX - (this.modelWidth / 2);
                y = this.modelY;
                break;
            case RIGHT_BOUND:
                x = this.modelX + (this.modelWidth / 2);
                y = this.modelY;
                break;
            case BOTTOM_BOUND:
                x = this.modelX;
                y = this.modelY + (this.modelHeight / 2);
                break;
        }
        return { x, y };
    }

    getBoundPoints = boundData => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        const bound = this.getBoundName(boundData);
        let finalPointInX = 0, finalPointInY = 0;
        switch(bound) {
            case TOP_BOUND:
                finalPointInX = 0;
                finalPointInY = this.roomInitialY - this.modelY + (this.modelHeight / 2);
                break;
            case LEFT_BOUND:
                finalPointInX = this.roomInitialX - this.modelX + (this.modelWidth / 2);
                finalPointInY = 0;
                break;
            case RIGHT_BOUND:
                finalPointInX = this.roomFinalX - this.modelX - (this.modelWidth / 2);
                finalPointInY = 0;
                break;
            case BOTTOM_BOUND:
                finalPointInX = 0;
                finalPointInY = this.roomFinalY - this.modelY - (this.modelHeight / 2);
                break;
        }
        let points = [0, 0, finalPointInX, finalPointInY];
        return points;
    }

    getBoundText = boundData => {
        const [distance] = Object.values(boundData);
        return distance;
    }

    getBoundSize = boundData => {
        const [initialX, initialY, finalX, finalY] = this.getBoundPoints(boundData);
        return {
            sizeOfTheBoundInX: Math.abs(finalX - initialX),
            sizeOfTheBoundInY: Math.abs(finalY - initialY)
        };
    }

    getBoundTextPosition = boundData => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND, TEXT_MARGIN } = BoundsFactory;
        const bound = this.getBoundName(boundData);
        const { sizeOfTheBoundInX, sizeOfTheBoundInY } = this.getBoundSize(boundData);
        const textToCreate = this.getBoundText(boundData);
        switch(bound) {
            case TOP_BOUND:
                return {
                    x: this.modelX + TEXT_MARGIN,
                    y: this.roomInitialY + (sizeOfTheBoundInY / 2) - (textToCreate.length * 3)
                };
            case LEFT_BOUND:
                return {
                    x: this.roomInitialX + (sizeOfTheBoundInX / 2) - (textToCreate.length * 3),
                    y: this.modelY - TEXT_MARGIN
                };
            case RIGHT_BOUND:
                return {
                    x: this.modelX + (this.modelWidth / 2) + (sizeOfTheBoundInX / 2) - (textToCreate.length * 3),
                    y: this.modelY - TEXT_MARGIN
                };
            case BOTTOM_BOUND:
                return {
                    x: this.modelX + TEXT_MARGIN,
                    y: this.modelY + (this.modelHeight / 2) + (sizeOfTheBoundInY / 2) - (textToCreate.length * 3),
                };
        }
    }

    getBoundRotation = boundData => {
        const { TOP_BOUND, BOTTOM_BOUND } = BoundsFactory;
        const bound = this.getBoundName(boundData);
        switch(bound) {
            case TOP_BOUND:
                return 90;
            case BOTTOM_BOUND:
                return 90;
        }
        return 0;
    }


    getDragBoundFunction = boundData => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        const bound = this.getBoundName(boundData);
        if(bound === TOP_BOUND || bound === BOTTOM_BOUND)
            return position => {
                position.y = 0;
                if(position.x > (this.modelWidth / 2))
                    position.x = this.modelWidth / 2;
                if(position.x < -(this.modelWidth / 2))
                    position.x = -(this.modelWidth / 2);
                return position;
            };
        if(bound === LEFT_BOUND || bound === RIGHT_BOUND)
            return position => {
                position.x = 0;
                if(position.y > (this.modelHeight / 2))
                    position.y = this.modelHeight / 2;
                if(position.y < -(this.modelHeight / 2))
                    position.y = -(this.modelHeight / 2);
                return position;
            }
    }

    create = () => {
        if(this.boundsAlreadyExist())
            this.deleteExistingBounds();
        //We create the bounds
        this.boundsToCreate.forEach((boundToCreate) => {
            const { x, y } = this.getBoundCoordinates(boundToCreate);
            let boundGroup = new Konva.Group({
                id: this.getBoundId(boundToCreate),
                draggable: true,
                dragBoundFunc: this.getDragBoundFunction(boundToCreate)
            });
            //We create the bound arrow
            let bound = new Konva.Arrow({
                x,
                y,
                points: this.getBoundPoints(boundToCreate),
                pointerLength: 4,
                pointerWidth: 5,
                fill: 'black',
                stroke: 'black',
                strokeWidth: 1,
                pointerAtBeginning: true,
            });
            //We create the bound text
            let text = new Konva.Text({
                fill: 'black',
                text: this.getBoundText(boundToCreate),
                draggable: true,
                rotation: this.getBoundRotation(boundToCreate),
            });
            text.position(this.getBoundTextPosition(boundToCreate))
            //We add the bound arrow and the text to the group
            boundGroup.add(bound);
            boundGroup.add(text);
            //We add the bound to the plane layer
            this.scene.planeLayer.add(boundGroup);
            this.manageVisibility();
        })
    }

    setBoundsVisibility = boundsVisibility => {
        this.model.setAttr(BoundsFactory.VISIBILITY_ATTR, boundsVisibility);
    }

    manageVisibility = () => {
        let boundsVisibility = this.model.getAttr(BoundsFactory.VISIBILITY_ATTR);
        if(!boundsVisibility)
            return;
        boundsVisibility.forEach(bound => {
            BoundsFactory.toggleVisibility({
                bound: bound.id,
                modelId: this.modelId, 
                visible: bound.visible !== undefined ? bound.visible : true,
                sceneInstance: this.scene
            })
        })
    }

    boundsAlreadyExist = () => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        let bounds = [TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND];
        let boundsExist = true;
        bounds.forEach(bound => {
            let boundToUpdate = this.scene.planeLayer.find(`#${this.modelId}_${bound}`);
            if(!boundToUpdate || Object.keys(boundToUpdate).length === 0)
                boundsExist = false;
        });
        return boundsExist;
    }

    deleteExistingBounds = () => {
        BoundsFactory.deleteModelBounds(this.modelId, this.scene);
    }

    static deleteModelBounds = (modelId, sceneInstance) => {
        const { TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND } = BoundsFactory;
        let bounds = [TOP_BOUND, LEFT_BOUND, RIGHT_BOUND, BOTTOM_BOUND];
        bounds.forEach(bound => {
            let boundsToDelete = sceneInstance.planeLayer.find(`#${modelId}_${bound}`);
            boundsToDelete.forEach(group => {
                group.remove();
            })
        });
    }

    static toggleVisibility = ({ modelId, bound, visible, sceneInstance }) => {
        let boundToToggle = sceneInstance.planeLayer.find(`#${modelId}_${bound}`);
        if(!boundToToggle)
            return;

        visible ? boundToToggle.show() : boundToToggle.hide();
    }

    static refreshModelBounds = (model, sceneInstance) => {
        (new BoundsFactory(model, sceneInstance)).create();
    }
}