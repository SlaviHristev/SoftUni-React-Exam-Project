import React, { createContext, useState, useEffect, useContext } from 'react';
import apiRequest from '../lib/apiRequest';
import { AuthContext } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (!currentUser || !currentUser._id) {
                console.warn('Current user or user ID is not available');
                return;
            }

            try {
                const response = await apiRequest.get(`/notifications/${currentUser._id}`);
                setNotifications(response.data);
                setLoading(false);
                console.log(notifications);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, [currentUser]);

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
