import Notification from '../Models/Notification.js';

// Create a new notification
export const createNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  console.log(req.body);
  try {
      const notification = new Notification({
          userId,
          type,
          message,
      });

      await notification.save();
      return res.status(201).json(notification);
  } catch (error) {
      console.error('Failed to create notification:', error);
      return res.status(400).json({ error: 'Failed to create notification' });
  }
};

// Get notifications for a specific user
export const getNotifications = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const notifications = await Notification.find({ userId: id });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Failed to fetch notifications:', error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch notifications' }); // Return a meaningful error response
    }
};

// Mark a notification as read
export const markAsRead = async (req, res) => {
    const notificationId = req.params.notificationId; // Extract notificationId from request parameters
    try {
        const updatedNotification = await Notification.findByIdAndUpdate(
            notificationId,
            { read: true },
            { new: true } // Option to return the updated document
        );

        if (!updatedNotification) {
            return res.status(404).json({ error: 'Notification not found' }); // Handle case where notification doesn't exist
        }

        res.status(200).json(updatedNotification); // Return the updated notification
    } catch (error) {
        console.error('Failed to mark notification as read:', error);
        res.status(500).json({ error: 'Failed to mark notification as read' }); // Return a meaningful error response
    }
};
