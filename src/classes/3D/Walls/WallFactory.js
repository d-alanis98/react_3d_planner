//Dependencies
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ModelScaleCalculator from '../Models/ModelScaleCalculator';

/**
 * @author Damián Alanís Ramírez
 * @version 2.1.0
 */
export default class WallFactory {
    //Constants
    //Wall defaults
    static WALL_DEPTH    = 0.05;
    static WALL_MODEL_ID = 60;
    static DEFAULT_COLOR = '#CFCFCF';
    //Sides
    static TOP_SIDE      = 'FRONT_SIDE';
    static LEFT_SIDE     = 'LEFT_SIDE';
    static RIGHT_SIDE    = 'RIGHT_SIDE';
    static BOTTOM_SIDE   = 'BOTTOM_SIDE';

    constructor(roomWidth, roomHeight, roomDepth, wallDepth, sceneInstance, wallsColor) {
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.roomDepth = roomDepth;
        this.wallDepth = wallDepth || WallFactory.WALL_DEPTH;
        this.sceneInstance = sceneInstance;
        this.wallsColor = wallsColor || WallFactory.DEFAULT_COLOR;
    }

    getSideCoordinates = side => {
        const { TOP_SIDE, LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE } = WallFactory;
        let wallPosition = {
            x: 0,
            y: 0,
            z: 0
        }
        switch(side) {
            case TOP_SIDE:
                return {
                    ...wallPosition,
                    z: -((this.roomDepth / 2) + (this.wallDepth / 2)),
                };
            case LEFT_SIDE:
                return {
                    ...wallPosition,
                    x: -((this.roomWidth / 2) + (this.wallDepth / 2)),
                };
            case RIGHT_SIDE:
                return {
                    ...wallPosition,
                    x: (this.roomWidth / 2) + (this.wallDepth / 2),
                };
            case BOTTOM_SIDE:
                return {
                    ...wallPosition,
                    z: (this.roomDepth / 2) + (this.wallDepth / 2),
                };
            default:
                return wallPosition;
        }
    }

    getSideRotation = side => {
        const { LEFT_SIDE, RIGHT_SIDE } = WallFactory;
        switch(side) {
            case LEFT_SIDE:
                return 90;
            case RIGHT_SIDE:
                return 90;
            default:
                return 0;
        }
    }

    getSideDimensions = side => {
        const { TOP_SIDE, LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE } = WallFactory;
        let dimensions = {
            width: this.roomWidth,
            height: this.roomHeight,
            depth: this.wallDepth
        }
        switch(side) {
            case TOP_SIDE:
            case BOTTOM_SIDE:
                return {
                    ...dimensions,
                    width: this.roomWidth + 2 * this.wallDepth,
                };
            case LEFT_SIDE:
            case RIGHT_SIDE:
                return {
                    ...dimensions,
                    width: this.roomDepth,
                };
            default:
                return dimensions;
        }
    }

    createWall = side => {
        let uri = `${process.env.MIX_APP_API_ENDPOINT}/productos/lineas/${WallFactory.WALL_MODEL_ID}/getModel`;
        let { x, y, z } = this.getSideCoordinates(side);
        const { width, height, depth } = this.getSideDimensions(side);
        let loader = new GLTFLoader();
        let rotation = this.getSideRotation(side);
        return new Promise((resolve, reject) => {
            loader.load(
                uri,
                gltf => {
                    //Scaled to real dimensions
                    gltf.scene.scale.set(1, 1, 1);
                    //New objects starts at origin
                    gltf.scene.position.set(0, 0, 0);
                    //We add the object to the scene
                    this.sceneInstance.addToScene(gltf.scene);
                    //We get the object of the scene and apply additional settings, finally we add it to the objects array (needed for drag controls)
                    gltf.scene.traverse( object => {
                        if(object.isMesh) {
                            //We set the proper scale to be accurate between the real dimensions and the dimensions in the 3D scene
                            let scaleCalculator = new ModelScaleCalculator(object, width, height, depth);
                            let { x: scaleInX, y: scaleInY, z: scaleInZ } = scaleCalculator.calculateScale();
                            object.scale.set(scaleInX, scaleInY, scaleInZ)
                            //We calculate the exact position to get the desired height
                            let yPosition = this.sceneInstance.getObjectYInitialPosition(y, object);
                            object.position.set(x, yPosition, z);
                            if(rotation)
                                object.rotateY(rotation * Math.PI / 180);
                            let material = new THREE.MeshPhysicalMaterial({ color: this.wallsColor });
                            object.material = material;
                            object.material.side = THREE.DoubleSide;
                            resolve(object);
                        }
                    }) 
                },
            );
        })

    }

    createAllWalls = () => {
        const { TOP_SIDE, LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE } = WallFactory;
        return new Promise((resolve, reject) => {
            let topWall = this.createWall(TOP_SIDE);
            let leftWall = this.createWall(LEFT_SIDE);
            let rightWall = this.createWall(RIGHT_SIDE);
            let bottomWall = this.createWall(BOTTOM_SIDE);
            Promise.all([topWall, leftWall, rightWall, bottomWall])
                .then(walls => resolve(walls))
                .catch(error => reject(error));
        });
    }
}