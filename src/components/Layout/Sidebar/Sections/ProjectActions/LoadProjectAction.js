import React, { Fragment } from 'react';
import LabelWithIcon from '../../../Labels/LabelWithIcon';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import withProjectState from '../../../../../redux/HOC/withProjectState';
import withNotifications from '../../../../Notifications/HOC/withNotifications';
import { NOTIFICATION_WARNING, NOTIFICATION_TIME_MD } from '../../../../../redux/reducers/notificationDuck';

const LoadProjectAction = ({ createNotification, restoreProject }) => {
    const loadFile = async event => {
        event.preventDefault()
        const reader = new FileReader();
        reader.onload = async event => { 
            const serializedProject = (event.target.result)
            restoreProject(serializedProject);
            createNotification('Proyecto abierto exitosamente', NOTIFICATION_WARNING, NOTIFICATION_TIME_MD);
        };
        reader.readAsText(event.target.files[0]);
    }

    return (
        <Fragment>
            <LabelWithIcon 
                icon = { faFolderOpen }
                title = 'Abrir'
                htmlFor = 'file_upload'
                className = 'text-sidebar-icon cursor-click mb-3'
                data-toggle = 'tooltip' 
                data-placement = 'right' 
            />
            <input 
                id ='file_upload'
                type = 'file'
                onChange = { loadFile }
            />
        </Fragment>
    );
}

let WithProjectState = withProjectState(LoadProjectAction);
let WithNotifications = withNotifications(WithProjectState);
export default WithNotifications;