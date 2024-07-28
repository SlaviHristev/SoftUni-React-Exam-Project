import Notification from '../Models/Notification.js'


export const createNotification = async (userId, type, message) => {
  try {
    const notification = new Notification({
      userId,
      type,
      message,
    });
    await notification.save();
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};

export const getNotifications = async (userId) => {
    try {
      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
      return notifications;
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      throw error;
    }
  };

export const markAsRead = async (notificationId) => {
    try {
      await Notification.findByIdAndUpdate(notificationId, { read: true });
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };