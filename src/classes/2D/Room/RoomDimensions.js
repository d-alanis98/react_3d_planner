import { TOP, FRONT, FRONT_RIGHT } from "../../../constants/models/models";

export default class RoomDimensions {

    static getRoomDimensionsOnCentiMeters = (roomWidth, roomDepth, roomHeight) => {
        return {
            roomWidth: roomWidth * 100,
            roomDepth: roomDepth * 100,
            roomHeight: roomHeight * 100
        }
    }

    static getDimensionsBasedOnView = (editorView, roomWidth, roomDepth, roomHeight) => {
        let width = roomWidth, height = roomHeight;
        switch(editorView) {
            case TOP:
                width = roomWidth;
                height = roomDepth;
                break;
            case FRONT:
                width = roomWidth;
                height = roomHeight;
                break;
            case FRONT_RIGHT:
                width = roomDepth;
                height = roomHeight;
                break;
        }

        return { width, height };
    }
}