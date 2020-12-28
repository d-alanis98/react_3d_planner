import React from 'react';
import { connect } from 'react-redux';
import { getFamilyAction } from '../reducers/familyDuck';

const withFamilyState = WrappedComponent => {
    const WithFamilyState = props => {
        let {
            family, 
            fetchingFamily,
            getFamilyAction,
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

        return <WrappedComponent 
            family = { family }
            getLine = { getLine }
            getFamily = { getFamilyAction }
            subFamilies = { family.subFamilias }
            getLineName = { getLineName }
            getProductKey = { getProductKey }
            getProductName = { getProductName }
            fetchingFamily = { fetchingFamily }
            getProductDoorStatus = { getProductDoorStatus }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => {
        return {
            family: state.family.family,
            fetchingFamily: state.family.fetching,
            ...ownProps
        }
    };

    return connect(
        mapStateToProps,
        {
            getFamilyAction
        }
    )(WithFamilyState);
}

export default withFamilyState;