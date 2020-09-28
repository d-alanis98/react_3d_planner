//Model names
export const WALL           = 'WALL';
export const KIOSK          = 'KIOSK';
export const TABLE          = 'TABLE';
export const BOARD          = 'BOARD';
export const FURNITURE      = 'FURNITURE';
//2D views
export const TOP            = 'TOP';
export const FRONT          = 'FRONT';
export const FRONT_LEFT     = 'FRONT_LEFT';
export const FRONT_RIGHT    = 'FRONT_RIGHT';

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

export let models2D = {
    [FURNITURE]: {
        //Views
        [TOP]: {
            uri: '/storage/assets/models/2D/furniture/furniture_top.svg',
            thumbnail: '/storage/assets/models/3D/furniture/thumbnail.png',
        },
        [FRONT]: {
            uri: '/storage/assets/models/2D/furniture/furniture_front.svg',
            thumbnail: '/storage/assets/models/3D/furniture/thumbnail.png',
        },
        [FRONT_LEFT]: {
            uri: '/storage/assets/models/2D/furniture/furniture_front.svg',
            thumbnail: '/storage/assets/models/3D/furniture/thumbnail.png',
        },
        [FRONT_RIGHT]: {
            uri: '/storage/assets/models/2D/furniture/furniture_front.svg',
            thumbnail: '/storage/assets/models/3D/furniture/thumbnail.png',
        }
    }
}

export let getDimensions = type => {
    switch(type){
        case TABLE:
            return {
                width: 0.75,
                depth: 0.5,
                height: 0.75,
            }
        case FURNITURE:
            return {
                width: 7,
                depth: 1.5,
                height: 2,
            }
        default:
            return {
                width: 1,
                depth: 1,
                height: 1
            }
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


export let getModel2DUri = (type, view) => {
    switch(type){
        case FURNITURE:
            return models2D[FURNITURE][view].uri;
        default:
            return models2D[FURNITURE][view].uri;
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