import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//HOC
import withProjectState from '../../../redux/HOC/withProjectState';
//Styles
import './PDFLayout.css';
//Icons
import { faImage } from '@fortawesome/free-solid-svg-icons';

const PDFLayout = ({ 
    layout,
    project: { name: projectName, projectToPDFItems, projectToPDFPages }, 
    pageNumber
}) => {

    const getCurrentPageItemsStartIndex = () => (
        projectToPDFPages
            .slice(0, pageNumber - 1)
            .map(page => page.layout)
            .reduce((current, accumulator) => accumulator.concat(current), [])
            .length
    );

    const startIndex = getCurrentPageItemsStartIndex();

    return (
        <div className='pdf-layout__container'>
            {
                layout.map((size, index) => (
                    <div 
                        key = { uuidv4() }
                        className = { `pdf-layout__${size}-section` }
                    >
                        {
                            projectToPDFItems[index + startIndex]
                                ? <img 
                                    src = { projectToPDFItems[index + startIndex].dataUrl } 
                                    className = 'pdf-layout__image'
                                />
                                : <FontAwesomeIcon 
                                    icon = { faImage }
                                    className = 'pdf-layout__image-thumbnail text-muted'
                                />
                        }

                    </div>
                ))
            }
        </div>
    )
}


let WithProjectState = withProjectState(PDFLayout);

export default WithProjectState;