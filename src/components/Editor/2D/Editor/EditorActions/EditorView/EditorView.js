import React from 'react';
//Components
import Dropup from '../../../../../Layout/Dropdowns/Dropup';
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import LabelWithIcon from '../../../../../Layout/Labels/LabelWithIcon';
import ButtonWithIcon from '../../../../../Layout/Buttons/ButtonWithIcon';
import CurrentViewLabel from './CurrentViewLabel';
//HOC
import withProjectState from '../../../../../../redux/HOC/withProjectState';
//Classes
import BidimensionalRenderer from '../../../../../../classes/Renderers/BidimensionalRenderer';
//Icons
import { faVideo, faCaretSquareUp, faWindowMaximize, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
//Constants
import { TOP, FRONT } from '../../../../../../constants/models/models';
import FlexColumn from '../../../../../Layout/Flex/FlexColumn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
                        <ButtonWithIcon 
                            icon = { faVideo }
                            type = 'outline-secondary'
                            className = 'btn-sm rounded-pill px-2 py-2'
                            buttonText = { 
                                <FlexColumn>
                                    <CurrentViewLabel 
                                        editorView = { editorView }
                                    />
                                    <small className='text-primary'>
                                        <FontAwesomeIcon 
                                            icon = { faInfoCircle }
                                            className = 'mr-1'
                                        />
                                        En desarrollo
                                    </small>
                                </FlexColumn>
                            } 
                            iconClassName = 'mr-2'
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
            </Dropup>
        </FlexRow>
    );
}

export default withProjectState(EditorView);