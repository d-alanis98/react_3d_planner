import React from 'react';
import { connect } from 'react-redux';
//Redux
import { 
    setWallsColorAction,
    setPlaneTextureAction,
    setDisplayPlaneSettingsAction 
} from '../reducers/planeDuck';

const withPlaneState = WrappedComponent => {
    const WithPlaneState = ({
        plane,
        setWallsColorAction,
        setPlaneTextureAction,
        setDisplayPlaneSettingsAction,
        ...ownProps
    }) => {

        return <WrappedComponent 
            plane = { plane }
            setWallsColor = { setWallsColorAction }
            setPlaneTexture = { setPlaneTextureAction }
            setDisplayPlaneSettings = { setDisplayPlaneSettingsAction }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => ({
        plane: state.plane,
        ...ownProps
    });

    

    return connect(mapStateToProps, {
        setWallsColorAction,
        setPlaneTextureAction,
        setDisplayPlaneSettingsAction,
    })(WithPlaneState);
}

export default withPlaneState;