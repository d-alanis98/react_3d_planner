//Classes
import WallFactory from '../../../../../../../classes/3D/Walls/WallFactory';


const { TOP_SIDE, LEFT_SIDE, RIGHT_SIDE, BOTTOM_SIDE } = WallFactory;

export const walls = [
    { 
        wallId: TOP_SIDE,
        wallName: 'superior'
    },
    { 
        wallId: LEFT_SIDE,
        wallName: 'izquierdo'
    },
    { 
        wallId: RIGHT_SIDE,
        wallName: 'derecho'
    },
    { 
        wallId: BOTTOM_SIDE,
        wallName: 'inferior'
    }
];

export const getWallIndexById = id => {
    switch(id) {
        case TOP_SIDE:
            return 0;
        case LEFT_SIDE:
            return 1;
        case RIGHT_SIDE:
            return 2;
        case BOTTOM_SIDE:
            return 3;
        default:
            return 0;
    }
}

export const getWallIdByIndex = index => {
    switch(index) {
        case 0:
            return TOP_SIDE;
        case 1:
            return LEFT_SIDE;
        case 2:
            return RIGHT_SIDE;
        case 3:
            return BOTTOM_SIDE;
        default:
            return TOP_SIDE;
    }
}