import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import domToImage from 'dom-to-image';
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
//HOC
import withNotifications from '../../Notifications/HOC/withNotifications';
import withEditorState from '../../../redux/HOC/withEditorState';
import with3DRendererContextConsumer from '../../Renderer/3D/HOC/with3DRendererContextConsumer';
//Redux
import { 
    addItemToPDFAction, 
    removeItemFromPDFAction, 
    stopProjectPDFExportAction,
    startProjectPDFExportAction, 
} from '../../../redux/reducers/projectDuck';
//Classes
import ObjectsHelper from '../../../classes/Helpers/ObjectsHelper';
import BidimensionalRenderer from '../../../classes/Renderers/BidimensionalRenderer';
import TridimensionalRenderer from '../../../classes/Renderers/TridimensionalRenderer';
//Constants
import { NOTIFICATION_DANGER, NOTIFICATION_INFO, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_MD, NOTIFICATION_TIME_SM } from '../../../redux/reducers/notificationDuck';
import { BIDIMENSIONAL_EDITOR, PDF_GENERATION, TRIDIMENSIONAL_EDITOR } from '../../../constants/sections/sections';


const withPDFGeneration = WrappedComponent => {
    const CAPTURE_ERROR                 = 'Hubo un error al capturar la escena';
    const CAPTURE_SUCCESS               = 'Escena capturada con éxito';
    const EXPORTING_TO_PDF_MESSAGE      = 'Exportando a PDF, seleccione escenas a capturar';
    const FORBIDDEN_SECTION_TO_CAPTURE  = 'La captura solo esta soportada en los editores 2D y 3D';

    const WithPDFGeneration = ({
        projectName,
        editorState: { editorType },
        rendererState: tridimensionalRendererState,
        setEditorType,
        projectToPDFItems,
        projectToPDFPages,
        addItemToPDFAction,
        createNotification,
        exportingProjectToPDF,
        removeItemFromPDFAction,
        stopProjectPDFExportAction,
        startProjectPDFExportAction,
        ...ownProps 
    }) => {
        //HOOKS
        //Effects
        /**
         * When the project PDF items change we validate if the total required items had been captured, in that case, we close the capture
         * controls and redirect to the PDF generation section.
         */
        useEffect(() => {
            //If we are not currently exporting to PDF we ignore the following validations
            if(!exportingProjectToPDF)
                return;
            const itemsToCapture = getItemsToCapture();
            if(itemsToCapture <= projectToPDFItems.length)
                stopProjectPDFExport();
        }, [projectToPDFItems])
        //FUNCTIONS

        /**
         * Creates a notification and starts the PDF sections capture, launching the controls
         */
        const startProjectPDFExport = () => {
            createNotification(EXPORTING_TO_PDF_MESSAGE, NOTIFICATION_INFO, NOTIFICATION_TIME_MD);
            startProjectPDFExportAction();
        }

        /**
         * Gets the canvas of the editor
         */
        const getDOMNodeByEditorType = () => {
            switch(editorType) {
                case BIDIMENSIONAL_EDITOR:
                    return document.getElementById(BidimensionalRenderer.DOM_CONTAINER_ID);
                case TRIDIMENSIONAL_EDITOR:
                    if(ObjectsHelper.isEmpty(tridimensionalRendererState))
                        return;
                    return document.getElementById(TridimensionalRenderer.DOM_CONTAINER_ID);
                default:
                    return undefined;
            }
        }

        /**
         * Creates the image from the DOM node (canvas) of the editor.
         */
        const captureDOMNodeToPNG = () => {
            let domNodeToCapture = getDOMNodeByEditorType();
            if(!domNodeToCapture) {
                createNotification(FORBIDDEN_SECTION_TO_CAPTURE, NOTIFICATION_DANGER, NOTIFICATION_TIME_MD);
                return;
            }
            domToImage.toPng(domNodeToCapture)
                .then(dataUrl => {
                    const itemToAddToPDF = {
                        id: uuidv4(),
                        dataUrl,
                    }
                    addItemToPDFAction(itemToAddToPDF);
                    createNotification(CAPTURE_SUCCESS, NOTIFICATION_SUCCESS, NOTIFICATION_TIME_SM);
                })
                .catch(error => {
                    createNotification(CAPTURE_ERROR, NOTIFICATION_DANGER, NOTIFICATION_TIME_MD);
                    console.error(CAPTURE_ERROR, error);
                });
            
        }

        /**
         * Stops the capturing state (it hides the controls) and redirects to the PDF generation section.
         */
        const stopProjectPDFExport = () => {
            //We stop the capture
            stopProjectPDFExportAction();
            //And redirect to the PDF viewer
            setEditorType(PDF_GENERATION);
        }

        /**
         * Gets the total items to be captured by counting the items per page based on the layout array.
         */
        const getItemsToCapture = () => (
            projectToPDFPages
                .map(page => page.layout)
                .reduce((current, accumulated) => accumulated.concat(current), [])
                .length
        );

        const printPDF = containerId => {
            const domNodeToInsertInPDF = document.getElementById(containerId);
            const scale = 2;
            domToImage.toJpeg(domNodeToInsertInPDF, {
                height: domNodeToInsertInPDF.offsetHeight * scale,
                style: {
                    transform: `scale(${scale}) translate(${domNodeToInsertInPDF.offsetWidth / 2 / scale}px, ${domNodeToInsertInPDF.offsetHeight / 2 / scale}px)`
                },
                width: domNodeToInsertInPDF.offsetWidth * scale,
                quality: 1
              })
                .then(dataUrl => {
                    const pdfDocument = new jsPDF({
                        orientation: 'landscape', 
                        unit: 'mm',
                        format: 'a4'
                    });
                    const documentWidth = pdfDocument.internal.pageSize.getWidth();
                    const documentHeight = pdfDocument.internal.pageSize.getHeight();
                    pdfDocument.text(projectName, 5, 7.5)
                    pdfDocument.addImage(dataUrl, 'JPEG', 0, 7.5, documentWidth, documentHeight - 7.5);
                    pdfDocument.save('sample-document.pdf');
                })
                .catch(error => {
                    console.error(error);
                })

            
        }


        return <WrappedComponent 
            printPDF = { printPDF }
            addItemToPDF = { addItemToPDFAction }
            removeItemFromPDF = { removeItemFromPDFAction }
            projectToPDFItems = { projectToPDFItems }
            getItemsToCapture = { getItemsToCapture }
            captureDOMNodeToPNG = { captureDOMNodeToPNG }
            stopProjectPDFExport = { stopProjectPDFExport }
            startProjectPDFExport = { startProjectPDFExport }
            exportingProjectToPDF = { exportingProjectToPDF }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => ({
        projectName: state.project.name,
        projectToPDFItems: state.project.projectToPDFItems,
        projectToPDFPages: state.project.projectToPDFPages,
        exportingProjectToPDF: state.project.exportingProjectToPDF,
        ...ownProps
    });

    //We get the state with the redux connect HOC
    let WithState = connect(mapStateToProps, {
        addItemToPDFAction,
        removeItemFromPDFAction,
        stopProjectPDFExportAction,
        startProjectPDFExportAction,
    })(WithPDFGeneration);
    //We apply the notifications HOC
    let WithNotifications = withNotifications(WithState);
    //We apply the editor state HOC
    let WithEditorState = withEditorState(WithNotifications);
    //We apply the 3D renderer context consumer HOC to get access to the scene instance
    let With3DRendererContextConsumer = with3DRendererContextConsumer(WithEditorState);
    //We return the decorated component
    return With3DRendererContextConsumer;
}

export default withPDFGeneration;