import * as THREE from 'three';

export default class WallColor {
    static applyColor = (wall, color) => {
        let material = new THREE.MeshPhysicalMaterial({ color });
        wall.material = material;
        wall.material.side = THREE.DoubleSide;
    }
}