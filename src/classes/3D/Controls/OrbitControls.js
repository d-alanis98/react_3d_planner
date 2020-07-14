import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class OrbitControls extends ThreeOrbitControls {
    constructor(camera, rendererDomElement){
        super(camera, rendererDomElement);
    }
}