import React from 'react';
//CSS
import './Notification.css';
//HOC
import withNotifications from './HOC/withNotifications';

const Notification = ({ notificationType, notificationMessage, displayNotification }) => {
    return(
        <div className='Notification-container bg-transparent'>
            <div 
                role = 'alert'
                className = { `Notification alert alert-${ notificationType } d-${displayNotification ? 'block' : 'none'} container mb-0` } 
            >
                { notificationMessage }
            </div>
        </div>
    )
}

export default withNotifications(Notification);