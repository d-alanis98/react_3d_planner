import Konva from 'konva';
//Constants
import { getModel2DUri, getDimensions, TOP } from '../../constants/models/models';

export default class BidimensionalRenderer {
    //CONSTANTS
    //DOM container
    static DOM_CONTAINER_ID = 'bidimensional_renderer';

    //CONSTRUCTOR
    constructor(sceneWidth = 100, sceneHeight = 100, enablePlaneControls = false) {
        this.objects = [];
        //Scene dimensions
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
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
    init(){
        this.setInitialStage();
        this.setInitialLayer();
        this.setPlane();
        this.addZoomEventToStage();
        this.render();
    }


    setInitialStage(){
        this.stage = new Konva.Stage({
            container: BidimensionalRenderer.DOM_CONTAINER_ID,
            width: this.containerWidth,
            height: this.containerHeight,
            draggable:  this.enablePlaneControls ? 'true' : null,
        });
    }

    setInitialLayer(){
        this.layer = new Konva.Layer();
        this.addLayerToStage(this.layer);
        this.layer.draw();
    }

    addLayerToStage(layer){
        this.stage.add(layer);
    }

    addZoomEventToStage(){
        let scaleBy = 1.1;
        if(!this.enablePlaneControls)
            return;
        this.stage.on('wheel', event => {
            event.evt.preventDefault();
            let oldScale = this.stage.scaleX();
            let pointer = this.stage.getPointerPosition();
    
            let mousePointTo = {
              x: (pointer.x - this.stage.x()) / oldScale,
              y: (pointer.y - this.stage.y()) / oldScale,
            };
    
            let newScale = event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
            this.stage.scale({ x: newScale, y: newScale });
    
            let newPosition = {
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            };
            this.stage.position(newPosition);
            this.stage.batchDraw();
          });
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

    render(){
        requestAnimationFrame(this.render);
        this.stage.batchDraw();
    }
    
    loadSVGModel(type, { x, y }, onSuccess, updateCallback){
        //We load items from catalog
        let path = getModel2DUri(type, TOP);
        //We get the dimensions of the object (assuming in a 2D top view the "height" is the depth)
        const { width, depth: height } = getDimensions(type);
        //We bind the instance to a variable
        let self = this;
        Konva.Image.fromURL(path, imageNode => {
            imageNode.setAttrs({
                //If no coordinates were given we place the objects in the middle of the plane
                x: x || self.containerWidth / 2,
                y: y || self.containerHeight / 2,
                type,
                width,
                height,
                //We set the center of the element
                offsetX: width / 2,
                offsetY: height / 2,
                //We enable the drag and drop interaction for this element
                draggable: 'true',
                //The function that defines the bound for dragging
                dragBoundFunc: pos => boundFunction(self, { width, height }, pos)
            });
            //We add the drag end event listener, to be able to update item position at project´s level
            imageNode.on('dragend', updateCallback );
            //We add the object to the layer
            this.layer.add(imageNode);
            //If given, we execute the success callback passing the created object as argument
            if(onSuccess && typeof(onSuccess) === 'function')
                onSuccess(imageNode);
            //We update the layer
            this.layer.batchDraw();
        });

        const boundFunction = (self, attrs, pos) => {
            let { width, height } = attrs;
            let widthPadding = width / 2;
            let heightPadding = height / 2;
            //X axis constraints
            let x = pos.x - widthPadding <= 0 ? 0 + widthPadding : pos.x + widthPadding >= self.containerWidth ? self.containerWidth - widthPadding : pos.x;
            //Y axis constraints
            let y = pos.y - heightPadding <= 0 ? 0 + heightPadding : pos.y + heightPadding >= self.containerHeight ? self.containerHeight - heightPadding : pos.y;
            return { x, y }
        }
    }
}