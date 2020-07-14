import * as THREE from 'three';


export default class ModelFactory {
    static CUBE     = 'CUBE';
    static SPHERE   = 'SPHERE';
    
    static create(type){
        let mesh, geometry;
        let material = new THREE.MeshLambertMaterial({ color: 0xFFCC00 })
        switch(type){
            case ModelFactory.CUBE:
                geometry = new THREE.BoxGeometry(3, 3, 3, 3, 3, 3);
                break;
            case ModelFactory.SPHERE:
                geometry = new THREE.SphereGeometry(3, 25, 25);
                break;
            default:
                geometry = new THREE.BoxGeometry(3, 3, 3, 3, 3, 3);
        }
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 3);
        return mesh;
    }
}