import React, { createContext, useState, useEffect, useContext } from 'react';
import apiRequest from '../lib/apiRequest';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await apiRequest.get('/notifications');
                setNotifications(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    const markAsRead = async (notificationId) => {
        try {
            await apiRequest.patch(`/notifications/${notificationId}`, { read: true });
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === notificationId ? { ...notification, read: true } : notification
                )
            );
        } catch (error) {
            console.error('Failed to mark notification as read', error);
        }
    };

    return (
        <NotificationContext.Provider value={{ notifications, loading, markAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
export default NotificationContext;
