import store from '../../redux/store';

/**
 * @author Damián Alanís Ramírez
 * @version 1.2.1
 */
export default class DimensionsGetter {

    static parseToMeters = stringDimensionInMilimeters => Number(stringDimensionInMilimeters) / 1000;

    static getDimensions = (productLine, productId) => {
        const {
            parseToMeters
        } = DimensionsGetter;
        //We get the getState function from the redux store
        let { getState } = store;
        //We get the subfamilies from the state
        let { family: { subFamilias: subFamilies } } = { ...getState().family };
        //We reduce the arrays of lines in a single one to be able to find the product line
        let lines = subFamilies.reduce((result, { lineas }) => result.concat(lineas), []);
        let selectedLine = lines.find(line => line.id_lineaProducto === productLine);
        if(!selectedLine)
            return;
        //We get the created product (whose dimensions we want to know) by its id
        let selectedProduct = selectedLine.productos.find(product => product.id_producto === productId)
        if(!selectedProduct)
            return;
        //We get the product´s dimensions
        let { ancho: width, alto: height, fondo: depth } = selectedProduct;
        //Finally, we parse them to number (and to meters)
        return {
            width: parseToMeters(width),
            height: parseToMeters(height),
            depth: parseToMeters(depth),
        };

    }
}