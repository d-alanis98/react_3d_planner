import * as THREE from 'three';


/**
 * @author Damián Alanís Ramírez
 * @version 1.0.0
 */
export default class PlaneTextureHelper {
    constructor(plane, sceneInstance) {
        this.plane = plane;
        this.sceneInstance = sceneInstance;
    }

    applyTexture = (textureId = 1) => {
        let textureUri = `${process.env.REACT_APP_ENDPOINT}/storage/textures/floor/${textureId}.jpg`;
        let texture = new THREE.TextureLoader().load(textureUri);
        //Required parameters, specially encoding, which is set to RGBA
        texture.encoding = THREE.RGBAFormat;
        texture.flipY = false;
        //We repeat the texture
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        const timesToRepeatHorizontally = this.sceneInstance.sceneWidth / 2;
        const timesToRepeatVertically = this.sceneInstance.sceneHeight / 2;
        texture.repeat.set(timesToRepeatHorizontally, timesToRepeatVertically);
        //We apply the texture to the object
        this.plane.material = new THREE.MeshStandardMaterial({
            map: texture,
        });
        this.plane.material.side = THREE.DoubleSide;
    }
}