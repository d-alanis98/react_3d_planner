import React from 'react';
//Components
import RendererContainer from '../RendererContainer';
import FixedHeightContainer from '../../../Layout/Containers/FixedHeightContainer';
import with2DRenderer from '../../../Renderer/2D/HOC/with2DRenderer';
import EditorActions from '../../2D/Editor/EditorActions/EditorActions';


const Editor = ({ models, addModel }) => {
    return (
        <FixedHeightContainer
            height = { 100 }
        >
            <FixedHeightContainer
                height = { 90 }
            >
                <RendererContainer />
            </FixedHeightContainer>
            <FixedHeightContainer
                height = { 10 }
                className = 'bg-none'
            >
                <EditorActions 
                    models = { models }
                    addModel = { addModel }
                />
            </FixedHeightContainer>
        </FixedHeightContainer>
    )
}

export default with2DRenderer(Editor);