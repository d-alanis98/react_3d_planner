
export const WALL       = 'WALL';
export const KIOSK      = 'KIOSK';
export const TABLE      = 'TABLE';
export const BOARD      = 'BOARD';
export const FURNITURE  = 'FURNITURE';


export let models = {
    [KIOSK]: {
        uri: '/assets/models/3D/kiosk/kiosk.glb',
        thumbnail: '/assets/models/3D/kiosk/thumbnail.png',
    },
    [TABLE]: {
        uri: '/assets/models/3D/table/table.glb',
        thumbnail: '/assets/models/3D/table/thumbnail.png',
    },
    [BOARD]: {
        uri: '/assets/models/3D/board/board.glb',
        thumbnail: '/assets/models/3D/board/thumbnail.png',
    },
    [FURNITURE]: {
        uri: '/assets/models/3D/furniture/furniture.glb',
        thumbnail: '/assets/models/3D/furniture/thumbnail.png',
    }
}

export let getModelUri = type => {
    switch(type){
        case WALL:
            return '/assets/models/3D/wall.glb'
        case KIOSK:
            return models[KIOSK].uri;
        case TABLE:
            return models[TABLE].uri;
        case BOARD:
            return models[BOARD].uri;
        case FURNITURE:
            return models[FURNITURE].uri;
        default:
            return models[KIOSK].uri;
    }
}

export let getModelThumbnail = type => {
    switch(type){
        case KIOSK:
            return models[KIOSK].thumbnail;
        case TABLE:
            return models[TABLE].thumbnail;
        case BOARD:
            return models[BOARD].thumbnail;
        case FURNITURE:
            return models[FURNITURE].thumbnail;
        default:
            return models[TABLE].thumbnail;
    }
}