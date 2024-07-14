import Chat from "../Models/Chat.js";

export const addChat = async (req, res) => {
    const tokenUserId = req.userId; 
    try {
        const newChat = new Chat({
            userIds: [tokenUserId, req.body.receiverId]
        });

        await newChat.save();

        res.status(200).json(newChat);
    } catch (error) {
        console.error('Failed to add chat:', error);
        res.status(500).json({ message: 'Failed to add chat!' });
    }
};