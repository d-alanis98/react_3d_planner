import React, { useState } from 'react';
//Context
import Renderer2DContext from '../Context/Renderer2DContext';

const with2DRendererContextProvider = WrappedComponent => {
    const With2DRendererContextProvider = props => {
        const rendererState = useState({});

        return (
            <Renderer2DContext.Provider
                value = { rendererState }
            >
                <WrappedComponent 
                    { ...props }
                />
            </Renderer2DContext.Provider>
        );
    }

    return With2DRendererContextProvider;
}

export default with2DRendererContextProvider;