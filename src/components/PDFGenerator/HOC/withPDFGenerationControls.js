import React, { Fragment, useEffect, useState } from 'react';
//Components
import CaptureControls from '../CaptureControls/CaptureControls';
//HOC
import withPDFGeneration from './withPDFGeneration';

const withPDFGenerationControls = WrappedComponent => {
    //Constants
    const ACTIVE = 'active';
    const INACTIVE = 'inactive';
    //Component
    const WithPDFGenerationControls = ({
        addItemToPDF,
        removeItemFromPDF,
        projectToPDFItems,
        projectToPDFPages,
        getItemsToCapture,
        captureDOMNodeToPNG,
        stopProjectPDFExport,
        startProjectPDFExport,
        exportingProjectToPDF,
        ...ownProps 
    }) => {

        const [controlsState, setControlsState] = useState(INACTIVE);

        useEffect(() => {
            exportingProjectToPDF
                ? setControlsState(ACTIVE)
                : setControlsState(INACTIVE);
        }, [exportingProjectToPDF]);

        const itemsToCapture = getItemsToCapture();

        return (
            <Fragment>
                <WrappedComponent 
                    { ...ownProps }
                />
                <CaptureControls 
                    controlsState = { controlsState }
                    capturedItems = { projectToPDFItems.length }
                    itemsToCapture = { itemsToCapture }
                    captureDOMNodeToPNG = { captureDOMNodeToPNG }
                    stopProjectPDFCapture = { stopProjectPDFExport }
                />
            </Fragment>
        )
    }

    //We apply the PDF generation HOC
    let WithPDFGeneration = withPDFGeneration(WithPDFGenerationControls);
    //We return the decorated component
    return WithPDFGeneration;
}

export default withPDFGenerationControls;