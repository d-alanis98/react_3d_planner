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
            uri: '/assets/models/2D/furniture/furniture_top.svg',
            thumbnail: '/assets/models/3D/furniture/thumbnail.png',
        },
        [FRONT]: {
            uri: '/assets/models/2D/furniture/furniture_front.svg',
            thumbnail: '/assets/models/3D/furniture/thumbnail.png',
        },
        [FRONT_LEFT]: {
            uri: '/assets/models/2D/furniture/furniture_front.svg',
            thumbnail: '/assets/models/3D/furniture/thumbnail.png',
        },
        [FRONT_RIGHT]: {
            uri: '/assets/models/2D/furniture/furniture_front.svg',
            thumbnail: '/assets/models/3D/furniture/thumbnail.png',
        }
    }
}

export let getDimensions = type => {
    switch(type){
        case TABLE:
            return {
                width: 50,
                depth: 50,
                height: 75,
            }
        case FURNITURE:
            return {
                width: 100,
                depth: 50,
                height: 200,
            }
        default:
            return {
                width: 100,
                depth: 100,
                height: 100
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