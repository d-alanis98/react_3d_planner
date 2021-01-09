import React from 'react';
//Components
import FlexRow from '../../../../../../../Layout/Flex/FlexRow';
import CircularIcon from '../../../../../../../Layout/Icons/CircularIcon';
//HOC
import withProjectState from '../../../../../../../../redux/HOC/withProjectState';
//Icons
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
//Constants
import { TOP } from '../../../../../../../../constants/models/models';

const RotateModel = ({ rotate, project }) => 
    shouldRotationRender(project) && (
        <FlexRow
            className = 'align-items-center justify-content-center px-2'
        >
            <CircularIcon 
                icon = { faUndo }
                onClick = { () => rotate(-90) }
                className = 'mr-2'
            />
            <CircularIcon 
                icon = { faRedo }
                onClick = { () => rotate(90) }
            />
        </FlexRow>
    );

export default withProjectState(RotateModel);

let shouldRotationRender = project => project && project.scene && project.scene['2d'].view === TOP;