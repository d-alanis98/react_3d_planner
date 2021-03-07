import React from 'react';
import { connect } from 'react-redux';
//Redux
import { 
    getFamilyAction,
    getMiscObjectsAction 
} from '../reducers/familyDuck';

const withFamilyState = WrappedComponent => {
    const WithFamilyState = props => {
        let {
            family, 
            otherObjects,
            fetchingFamily,
            getFamilyAction,
            getMiscObjectsAction,
            fetchingOtherObjects,
            ...ownProps
        } = props;

        const getLine = subFamilyId => {
            let subFamilyItem = family.subFamilias.find(subFamily => subFamily.id_subFamiliaProducto === subFamilyId);
            return subFamilyItem ? subFamilyItem.lineas : undefined;
        }

        const getLineById = lineId => {
            let lines = family.subFamilias
                            .reduce((accumulated, current) => accumulated.concat(current.lineas), []);
            return lines.find(line => line.id_lineaProducto === lineId);
        }

        const getLineName = lineId => {
            let targetLine = getLineById(lineId);
            return targetLine ? targetLine.descripcion_es : '';
        }

        const getProductByIdAndLine = (productId, lineId) => {
            let targetLine = getLineById(lineId);
            if(!targetLine)
                return;
            return targetLine.productos.find(product => product.id_producto === productId);
        }

        const getProductKey = (productId, lineId) => {
            let targetProduct = getProductByIdAndLine(productId, lineId);
            return targetProduct ? targetProduct.clave : '';
        }

        const getProductName = (productId, lineId) => {
            let targetProduct = getProductByIdAndLine(productId, lineId);
            return targetProduct ? targetProduct.descripcion_es : '';
        }

        const getProductDoorStatus = (productId, lineId) => {
            let targetProduct = getProductByIdAndLine(productId, lineId);
            return targetProduct ? targetProduct.open_depth : '0,w';
        }

        const canDoorBeOpenedOrClosed = lineId => {
            const line = getLineById(lineId);
            const { o_c: canBeOpenOrClosed } = line;
            return Boolean(canBeOpenOrClosed);
        }

        const modelHasRightOrLeftVariant = lineId => {
            const line = getLineById(lineId);
            const { i_d: hasRightOrLeftVariant } = line;
            return Boolean(hasRightOrLeftVariant);
        }

        const getProductInitialCoordinates = (productId, lineId) => {
            let targetProduct = getProductByIdAndLine(productId, lineId);
            let { alto: height } = targetProduct;
            //Y must be the half of the height in meters (which is the "unit" in the 3D space), to appear baseline and not centered in origin
            return {
                x: 0,
                y: Number(height) / 2000,
                z: 0
            };
        }

        const getMiscObjectInitialCoordinates = modelId => {
            const { height } = getMiscObjectDimensions(modelId);
            //Y must be the half of the height in meters (which is the "unit" in the 3D space), to appear baseline and not centered in origin
            return {
                x: 0,
                y: Number(height) / 2000,
                z: 0
            };
        }

        const getMiscObjectById = modelId => otherObjects.find(model => model.id_extra === Number(modelId));

        const getMiscObjectDimensions = modelId => {
            let model = getMiscObjectById(modelId);
            if(!model)
                return;
            return {
                width: model.width || 500,
                height: model.height || 500,
                depth: model.depth || 500
            }
        }

        return <WrappedComponent 
            family = { family }
            getLine = { getLine }
            getFamily = { getFamilyAction }
            subFamilies = { family.subFamilias }
            getLineName = { getLineName }
            otherObjects = { otherObjects }
            getProductKey = { getProductKey }
            getMiscObjects = { getMiscObjectsAction }
            getProductName = { getProductName }
            fetchingFamily = { fetchingFamily }
            getMiscObjectById = { getMiscObjectById }
            fetchingOtherObjects = { fetchingOtherObjects }
            getProductDoorStatus = { getProductDoorStatus }
            getProductByIdAndLine = { getProductByIdAndLine }
            getMiscObjectDimensions = { getMiscObjectDimensions }
            canDoorBeOpenedOrClosed = { canDoorBeOpenedOrClosed }
            modelHasRightOrLeftVariant = { modelHasRightOrLeftVariant }
            getProductInitialCoordinates = { getProductInitialCoordinates }
            getMiscObjectInitialCoordinates = { getMiscObjectInitialCoordinates }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            family: state.family.family,
            otherObjects: state.family.otherObjects,
            fetchingFamily: state.family.fetching,
            fetchingOtherObjects: state.family.fetchingOtherObjects,
            ...ownProps
        }
    };

    return connect(
        mapStateToProps,
        {
            getFamilyAction,
            getMiscObjectsAction
        }
    )(WithFamilyState);
}

export default withFamilyState;