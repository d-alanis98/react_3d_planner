import React, { Fragment } from 'react';
//Components
import FlexRow from '../../../../../Layout/Flex/FlexRow';
import CollapseController from '../../../../../Layout/Collapsable/CollapseController';
import LabelWithIcon from '../../../../../Layout/Labels/LabelWithIcon';
import CollapsableContent from '../../../../../Layout/Collapsable/CollapsableContent';
import FixedHeightContainer from '../../../../../Layout/Containers/FixedHeightContainer';
//Styles
import './EditorSection.css';

const EditorSection = ({ 
    children, 
    targetId, 
    sectionIcon, 
    sectionName,
    defaultExpanded 
}) =>  (
    <Fragment>
        <FlexRow
            className = 'editor-section__title_label'
        >
            <CollapseController 
                expanded = { defaultExpanded }
                targetId = { targetId }
                className = 'cursor-click mr-2'
            />
            <LabelWithIcon 
                icon = { sectionIcon }
                className = 'text-light mb-0'
                labelText = { sectionName }
            />
        </FlexRow>
        <CollapsableContent
            id = { targetId }
        >
            { children }
        </CollapsableContent>
    </Fragment>
);

export default EditorSection;