import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//Components
import FlexRow from '../Layout/Flex/FlexRow';
import FlexColumn from '../Layout/Flex/FlexColumn';
import PageBuilder from './PageBuilder/PageBuilder';
import LabelWithIcon from '../Layout/Labels/LabelWithIcon';
import ButtonWithIcon from '../Layout/Buttons/ButtonWithIcon';
//HOC
import withProjectState from '../../redux/HOC/withProjectState';
import withPDFGeneration from './HOC/withPDFGeneration';
//Icons
import { faInfoCircle, faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const PDFGenerator = ({ 
    printPDF, 
    project: { projectToPDFPages, projectToPDFItems },
    setProjectPDFPages, 
    startProjectPDFExport, 
    
}) => {
    const [pages, setPages] = useState(projectToPDFPages);

    useEffect(() => {
        setProjectPDFPages(pages);
        shouldPDFDownloadEnable()
    }, [pages]);

    const addPage = () => {
        const newPage = {
            id: uuidv4(),
            layout: ['md', 'md', 'lg', 'sm']
        }

        setPages(pages.concat(newPage));
    }

    const removePage = pageId => {
        const filteredPages = pages.filter(page => page.id !== pageId);
        setPages(filteredPages);
    }


    const shouldPDFDownloadEnable = pageNumber => {
        const totalItemsToCapture = pages
                                    .slice(0, pageNumber)
                                    .map(page => page.layout)
                                    .reduce((current, accumulator) => accumulator.concat(current), [])
                                    .length;
        return totalItemsToCapture > 0 && totalItemsToCapture <= projectToPDFItems.length;
    }


    return (
        <Fragment>
            <FlexColumn
                className = 'align-items-center w-100 pb-3'
            >
                <h3>Exportar proyecto a PDF</h3>
                <FlexRow
                    className = 'align-items-center justify-content-around flex-wrap w-100 px-4'
                >
                    {
                        pages.length > 0
                            ? <ButtonWithIcon 
                                type = 'primary'
                                icon = { faPlayCircle }
                                onClick = { event => startProjectPDFExport() }
                                className = 'rounded-pill'
                                buttonText = 'Empezar la captura'
                            />
                            : <div className='alert alert-dark w-100 mb-2'>
                                <LabelWithIcon 
                                    icon = { faInfoCircle }
                                    labelText = 'Debe haber al menos una página para iniciar la captura'
                                    className = 'mb-0'
                                />
                            </div>
                    }
                    <FlexRow
                        className = 'align-items-center justify-content-between'
                    >
                        <ButtonWithIcon 
                            type = 'success'
                            icon = { faPlusCircle }
                            onClick = { event => addPage() }
                            className = 'rounded-pill mr-2'
                            buttonText = 'Agregar página'
                        />
                    </FlexRow>
                </FlexRow>
            </FlexColumn>

            {
                pages.map((page, index) => (
                    <PageBuilder 
                        key = { page.id }
                        id = { page.id }
                        layout = { page.layout }
                        printPDF = { printPDF }
                        pageNumber = { index + 1 }
                        removePage = { removePage }
                        shouldPDFDownloadEnable = { true }
                    />
                ))
            }
        </Fragment>
    )
}

let WithPDFGeneration = withPDFGeneration(PDFGenerator);
let WithProjectState = withProjectState (WithPDFGeneration);

export default WithProjectState;