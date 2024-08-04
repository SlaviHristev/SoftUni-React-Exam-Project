import './notification.scss';

const Notification = ({ notifications, markAsRead }) => {
   

    return (
        <div className="notificationList">
            {notifications.map((notification) => (
                <div key={notification._id} className={`notificationItem ${notification.read ? 'read' : ''}`}>
                    <p>{notification.message}</p>
                    {!notification.read && (
                        <button onClick={() => markAsRead(notification._id)}>Mark as Read</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Notification;
