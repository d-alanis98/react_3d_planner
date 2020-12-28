import React, { useContext } from 'react';
//Context
import Renderer2DContext from '../Context/Renderer2DContext';

const with2DRendererContextConsumer = WrappedComponent => {
    const With2DRendererContextConsumer = props => {
        const [rendererState, setRendererState] = useContext(Renderer2DContext);

        return <WrappedComponent 
            rendererState = { rendererState }
            setRendererState = { setRendererState }
            { ...props }
        />
    }

    return With2DRendererContextConsumer;
}

export default with2DRendererContextConsumer;