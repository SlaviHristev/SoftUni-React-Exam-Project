import { useNotifications } from '../../context/NotificationContext';
import Spinner from '../Spinner/Spinner';
import './notification.scss';

const Notification = () => {
    const { notifications, loading, markAsRead } = useNotifications();

    if (loading) return <Spinner />;

    return (
        <div className="notificationList">
            {notifications.length === 0 ? (
                <p>No notifications</p>
            ) : (
                notifications.map((notification) => (
                    <div
                        key={notification._id}
                        className={`notificationItem ${notification.read ? 'read' : 'unread'}`}
                        onClick={() => markAsRead(notification._id)}
                    >
                        <p>{notification.message}</p>
                        <span>{new Date(notification.createdAt).toLocaleString()}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default Notification;