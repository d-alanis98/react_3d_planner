import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//Icons
import { faCamera, faStop } from '@fortawesome/free-solid-svg-icons';
//Styles
import './CaptureControls.css';


const CaptureControls = ({ 
    controlsState, 
    capturedItems,
    itemsToCapture,
    captureDOMNodeToPNG, 
    stopProjectPDFCapture 
}) => {
    return (
        <div 
            className = { `capture-controls capture-controls--${controlsState || 'inactive'}` }
        >
            <div className='capture-controls__container'>
                <p className='text-muted'>{ capturedItems } / { itemsToCapture }</p>
                <button 
                    title = 'Capturar escena'
                    onClick = { event => captureDOMNodeToPNG() }
                    className = 'capture-controls__action-button capture-controls__action-button--show'
                    data-toggle = 'tooltip' 
                    data-placement = 'left' 
                >
                    <FontAwesomeIcon 
                        icon = { faCamera }
                    />
                </button>
                <button 
                    title = 'Detener captura'
                    onClick = { event => stopProjectPDFCapture() }
                    className = 'capture-controls__capture-button'
                    data-toggle = 'tooltip' 
                    data-placement = 'left' 
                >
                    <FontAwesomeIcon 
                        icon = { faStop }
                    />
                </button>
            </div>
        </div>
    );
}

export default CaptureControls;