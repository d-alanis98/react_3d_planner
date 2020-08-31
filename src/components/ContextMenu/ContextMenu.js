import React, { useEffect, useRef } from 'react';
//CSS
import './ContextMenu.css';

const ContextMenu = ({ children, displayContextMenu = false, contextMenuPositionInX, contextMenuPositionInY }) => {
    const contextMenu = useRef();
    useEffect(() => {
        window.addEventListener('click', onWindowClick);

        return () => {
            window.removeEventListener('click', onWindowClick);
        }
    }, []);

    useEffect(() => {
        setContextMenuPosition(contextMenuPositionInX, contextMenuPositionInY);
        showContextMenu(displayContextMenu);
    }, [
        displayContextMenu, 
        contextMenuPositionInX, 
        contextMenuPositionInY
    ]);

    const onWindowClick = event => {
        if(contextMenu && contextMenu.current)
        showContextMenu(false);
    }

    const showContextMenu = (show = true) => contextMenu.current.style.display = show ? 'block' : 'none';

    const setContextMenuPosition = (x, y) => {
        contextMenu.current.style.top = `${y}px`;
        contextMenu.current.style.left = `${x}px`;
    }


    return (
        <ul 
            ref = { contextMenu }
            className = 'custom-cm' 
        >
            { children }
        </ul>
    );
}

export default ContextMenu;