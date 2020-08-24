/**
 * @author Damián Alanís Ramírez
 * @version 3.4.5
 * @description Class that contains the logic to compose the 2D renderer, this class provide methods to add objects
 * to the scene and allows the mnipulation in several ways of the different components of the 2D scene.
 */
//Libraries
import Konva from 'konva';
//Classes
import PlaneEvents from '../2D/Plane/PlaneEvents';
import RoomCoordinatesCalculator from '../2D/Room/RoomCoordinatesCalculator';
import BidimensionalModelFactory from '../2D/Models/BidimensionalModelFactory';


export default class BidimensionalRenderer {
    //CONSTANTS
    //SCENE IDENTIFICATOR
    static BIDIMENSIONAL_SCENE = '2d';
    //DOM container
    static DOM_CONTAINER_ID = 'bidimensional_renderer';
    //Dimensions
    static DEFAULT_WIDTH = 5;
    static DEFAULT_HEIGHT = 5;
    //Plane
    static PLANE_PADDING = 10; //10 pixels
    //CONSTRUCTOR
    constructor(roomWidth = BidimensionalRenderer.DEFAULT_WIDTH, roomHeight = BidimensionalRenderer.DEFAULT_HEIGHT, enablePlaneControls = false) {
        this.objects = [];
        //Room dimensions
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        //Plane controls
        this.enablePlaneControls = enablePlaneControls;
        //Container dimensions
        this.domContainer = document.getElementById(BidimensionalRenderer.DOM_CONTAINER_ID);
        this.containerWidth = this.domContainer.clientWidth;
        this.containerHeight = this.domContainer.clientHeight;
        this.containerAspectRatio = this.containerWidth / this.containerHeight;
        //Methods linkage
        this.render = this.render.bind(this);
    }

    //PRIMARY METHODS
    /**
     * This method initializes the scene, setting the stage, the layer and the plane (which includes the room rendering)
     */
    init(){
        this.setInitialStage();
        this.setInitialLayer();
        this.setPlane();
        this.addZoomEventToStage();
        this.render();
    }

    /**
     * This method sets the main stage, which is the canvas that is rendered in the specified container, with the desired
     * dimensions.
     */
    setInitialStage(){
        this.stage = new Konva.Stage({
            container: BidimensionalRenderer.DOM_CONTAINER_ID,
            width: this.containerWidth,
            height: this.containerHeight,
            draggable:  this.enablePlaneControls ? 'true' : null,
        });
    }

    /**
     * This method sets the main layer, also, we add the layer to stage and draw it
     */
    setInitialLayer(){
        this.layer = new Konva.Layer();
        this.addLayerToStage(this.layer);
        this.layer.draw();
    }

    /**
     * Helper method to add a layer to the stage
     * @param {object} layer 
     */
    addLayerToStage(layer){
        this.stage.add(layer);
    }

    /**
     * 
     */
    addZoomEventToStage(){
        if(!this.enablePlaneControls)
            return;
            
        PlaneEvents.addPlaneZoomEventListener(this.stage);
    }

    setPlaneCenter(){
        this.planeCenterCoordinates = {
            x: this.containerWidth / 2,
            y: this.containerHeight / 2,
        }
    }

    setPlane(){
        this.plane = new Konva.Rect({
            x: 0,
            y: 0,
            width: this.containerWidth,
            height: this.containerHeight,
            fill: 'lightgray',
            stroke: 'black',
            opacity: 0.25,
            strokeWidth: 1,
        });
        this.setPlaneCenter();
        this.layer.add(this.plane)
        this.drawGrid();
        this.drawRoom()
    }

    drawGrid(){
        //Internal constants
        const ROW = 'ROW';
        const COLUMN = 'COLUMN';
        //Internal variables
        let gridSize = 50;
        let numberOfRows = this.containerHeight / gridSize;
        let numberOfCols = this.containerWidth / gridSize;
        //Function that draws the requested number of lines, of the requested type ('row' || 'col') with the desired size
        const drawLinesInAxis = (numberOfLines, type, size, gridSize) => {
            Array.from(new Array(Math.round(numberOfLines))).forEach((row, index) => {
                this.layer.add(
                    new Konva.Rect({
                        x: type === ROW ? 0 : index * gridSize,
                        y: type === ROW ? index * gridSize : 0,
                        width: type === ROW ? size : 0,
                        height: type === ROW ? 0 : size,
                        stroke: 'black',
                        opacity: 0.25,
                        strokeWidth: 1,
                    })
                );
            })
        }
        //We generate the grid by drawing the rows and the columns based on the grid size (each square side)
        drawLinesInAxis(numberOfRows, ROW, this.containerWidth, gridSize);
        drawLinesInAxis(numberOfCols, COLUMN, this.containerHeight, gridSize);
    }

    drawRoom(){
        let { roomWidth, roomHeight, containerWidth, containerHeight } = this;
        //We create a new room coordinates calculator instance, this facade returns the optimal coordinates to get the more portion of the plane in the screen by applying the less scale posible
        let roomCoordinatesCalculator = new RoomCoordinatesCalculator(roomWidth, roomHeight, containerWidth, containerHeight);
        //We get the coordinates and the room dimensions in pixels
        this.roomCoordinates = roomCoordinatesCalculator.calculate();
        this.roomDimensionInPixels = roomCoordinatesCalculator.getRoomDimensionsInPixels();
        //We get the necessary data to draw the room
        const { initialX, initialY } = this.roomCoordinates; //We only need the initial points
        const { width, height } = this.roomDimensionInPixels;
        //We add the room to the layer
        this.layer.add(
            new Konva.Rect({
                x: initialX,
                y: initialY,
                width: width,
                height: height,
                stroke: 'black',
                opacity: 1,
                strokeWidth: 1,
            })
        );
    }

    getRoomDimensionInPixels(){
        return this.roomDimensionInPixels;
    }

    render(){
        requestAnimationFrame(this.render);
        this.stage.batchDraw();
    }

    
    loadSVGModel(type, { x, y }, onSuccess, onUpdate, onSelection){
        //We bind the instance to a variable
        let scene = this;
        //We create the model, and execute the bussiness logic after its creation via the BidimensionalModelFactory
        BidimensionalModelFactory.createModel({
            x, 
            y,
            type,
            scene, 
            onUpdate,  
            onSuccess, 
            onSelection, 
        });
    }
}