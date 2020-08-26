import React from 'react';
import { connect } from 'react-redux';
//Redux
import { createNotificationAction } from '../../../redux/reducers/notificationDuck';

const withNotifications = WrappedComponent => {
    const WithNotifications = ({ notificationType, notificationMessage, displayNotification, createNotificationAction, ...ownProps }) => {

        return <WrappedComponent 
            notificationType = { notificationType }
            createNotification = { createNotificationAction }
            notificationMessage = { notificationMessage }
            displayNotification = { displayNotification }
            { ...ownProps }
        />
    }

    const mapStateToProps = (state, ownProps) => {
        const { 
            display: displayNotification,
            notificationData: { type: notificationType, message: notificationMessage },
        } = state.notification;

        return {
            notificationType,
            notificationMessage,
            displayNotification,
            ...ownProps
        }
    }

    return connect(mapStateToProps, { createNotificationAction })(WithNotifications);
}

export default withNotifications;