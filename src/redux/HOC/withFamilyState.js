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

        return <WrappedComponent 
            family = { family }
            getLine = { getLine }
            getFamily = { getFamilyAction }
            subFamilies = { family.subFamilias }
            fetchingFamily = { fetchingFamily }
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