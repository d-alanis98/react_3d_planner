import * as THREE from 'three';

export default class PlaneFactory {
    static GRID         = 'GRID';
    static MESH_PLANE   = 'MESH_PLANE';
    static DEFAULT_SIZE = 4;
    static DEFAULT_GRID = 10;
    /**
     * Returns an instance of the desired plane class
     * @param {string} type 
     */
    static create(type, width = PlaneFactory.DEFAULT_SIZE, height = PlaneFactory.DEFAULT_SIZE){
        let plane;
        switch(type){
            case PlaneFactory.GRID:
                plane = new THREE.GridHelper(width, PlaneFactory.DEFAULT_GRID);
                break;
            case PlaneFactory.MESH_PLANE:
                const loader = new THREE.TextureLoader();
                plane = new THREE.Mesh(
                    new THREE.PlaneGeometry(
                        width, 
                        height, 
                        PlaneFactory.DEFAULT_GRID, 
                        PlaneFactory.DEFAULT_GRID
                    ),
                    new THREE.MeshBasicMaterial({ 
                        color: 0xFFFFFF,
                        map: loader.load('/assets/textures/floor.png')
                    })
                );
                break;
            default:
                plane = new THREE.GridHelper(PlaneFactory.DEFAULT_SIZE, PlaneFactory.DEFAULT_GRID);
        }
        return plane;
    }
}