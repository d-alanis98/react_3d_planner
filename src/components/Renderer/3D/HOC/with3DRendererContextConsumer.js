import React, { useContext } from 'react';
//Context
import Renderer3DContext from '../Context/Renderer3DContext';

const with3DRendererContextConsumer = WrappedComponent => {
    const With3DRendererContextConsumer = props => {
        const [rendererState, setRendererState] = useContext(Renderer3DContext);

        return <WrappedComponent 
            rendererState = { rendererState }
            setRendererState = { setRendererState }
            { ...props }
        />
    }

    return With3DRendererContextConsumer;
}

export default with3DRendererContextConsumer;