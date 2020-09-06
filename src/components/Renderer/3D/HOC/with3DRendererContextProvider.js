import React, { useState } from 'react';
//Context
import Renderer3DContext from '../Context/Renderer3DContext';

const with3DRendererContextProvider = WrappedComponent => {
    const With3DRendererContextProvider = props => {
        const rendererState = useState({});

        return (
            <Renderer3DContext.Provider
                value = { rendererState }
            >
                <WrappedComponent 
                    { ...props }
                />
            </Renderer3DContext.Provider>
        );
    }

    return With3DRendererContextProvider;
}

export default with3DRendererContextProvider;