/**
 * @todo Posteriormente esto vendrá de BD
 */
const WOOD_TEXTURE_URI = `${process.env.MIX_APP_API_ENDPOINT}/colors/22`;
const FLOOR_TEXTURE_URI = `${process.env.MIX_APP_API_ENDPOINT}/colors/9`;

export default class TextureFactory {
    static WOOD_TEXTURE = 'WOOD_TEXTURE';
    static FLOOR_TEXTURE = 'FLOOR_TEXTURE';

    static getTextureUri = textureType => {
        let { WOOD_TEXTURE, FLOOR_TEXTURE } = TextureFactory;
        switch(textureType){
            case WOOD_TEXTURE:
                return WOOD_TEXTURE_URI;
            case FLOOR_TEXTURE:
                return FLOOR_TEXTURE_URI;
            default:
                return FLOOR_TEXTURE_URI;
        }
    }
}