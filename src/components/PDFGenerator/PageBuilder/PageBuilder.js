import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//Components
import FlexRow from '../../Layout/Flex/FlexRow';
import PDFLayout from '../PDFLayout/PDFLayout';
import CircularIcon from '../../Layout/Icons/CircularIcon';
//Styles
import './PageBuilder.css';
//Icons
import { faMinusCircle, faPrint } from '@fortawesome/free-solid-svg-icons';
import LabelWithIcon from '../../Layout/Labels/LabelWithIcon';


const PageBuilder = ({ 
    id, 
    layout, 
    printPDF,
    pageNumber, 
    removePage,
    shouldPDFDownloadEnable 
}) => {

    const [sectionToPrintId, setSectionToPrintId] = useState(uuidv4());


    return (
        <div
            id = { id }
            className = 'page-builder'
        >

            <FlexRow
                className = 'justify-content-end page-builder__header '
            >
                <p className='text-muted mb-0'>Página { pageNumber }</p>
                <CircularIcon 
                    icon = { faMinusCircle }
                    onClick = { event => removePage(id) }
                    className = 'mr-2'
                    iconClassName = 'text-danger'
                />
            </FlexRow>
        
            <div 
                id = { sectionToPrintId }
                className = 'page-builder__content'
            >
                <PDFLayout 
                    pageNumber = { pageNumber }
                    layout = { layout }
                />
            </div>
            {
                shouldPDFDownloadEnable &&
                <div className='page-builder__print-icon'>
                    <LabelWithIcon 
                        icon = { faPrint }
                        onClick = { event => printPDF(sectionToPrintId) }
                        className = 'text-muted cursor-click'
                    />
                </div>
            }

        </div>
        
    );
}

export default PageBuilder;