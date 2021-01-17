import React from 'react';
//Components
import Dropup from '../../../../../Layout/Dropdowns/Dropup';
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../../../../Layout/Labels/LabelWithIcon';
import ActionWithIcon from '../ModelActions/Actions/ActionWithIcon/ActionWithIcon';
import CurrentViewLabel from './CurrentViewLabel';
//HOC
import withProjectState from '../../../../../../redux/HOC/withProjectState';
//Classes
import BidimensionalRenderer from '../../../../../../classes/Renderers/BidimensionalRenderer';
//Icons
import { faVideo, faCaretSquareUp, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
//Constants
import { TOP, FRONT, FRONT_RIGHT } from '../../../../../../constants/models/models';



const EditorView = ({ project: projectState, setProjectScene }) => {
    //CONSTANTS
    const BIDIMENSIONAL = BidimensionalRenderer.BIDIMENSIONAL_SCENE;
    //PROPS
    const { scene: projectScene } = projectState;
    //We get the scenes
    const bidimensionalScene = projectScene[BIDIMENSIONAL];
    const { view: editorView } = bidimensionalScene;



    const changeView = view => {
        const updatedScene = { 
            ...projectScene,
            [BIDIMENSIONAL]: {
                ...bidimensionalScene,
                view
            }
        };
        setProjectScene(updatedScene);
    }

    return (
        <FlexRow
            className = 'h6 align-items-center m-0 p-0'
        >
            <Dropup
                togglerText = { 
                        <ActionWithIcon 
                            icon = { faVideo }
                            actionText = { <CurrentViewLabel editorView = { editorView } /> }
                            textClassName = 'ml-1 p-0 my-0'
                            onClick = { ev => ev.preventDefault() }
                        />
                 }
                className = 'text-secondary'
            >
                <LabelWithIcon 
                    icon = { faCaretSquareUp }
                    labelText = 'Superior'
                    onClick = { event => changeView(TOP) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faWindowMaximize }
                    labelText = 'Frontal'
                    onClick = { event => changeView(FRONT) }
                    className = 'cursor-click dropdown-item'
                />
                <LabelWithIcon 
                    icon = { faWindowMaximize }
                    labelText = 'Lateral'
                    onClick = { event => changeView(FRONT_RIGHT) }
                    className = 'cursor-click dropdown-item'
                />
            </Dropup>
        </FlexRow>
    );
}

export default withProjectState(EditorView);