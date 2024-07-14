import Chat from "../Models/Chat.js";

export const startChat = async (req, res) => {
    const { userId1, userId2 } = req.body;

  try {
    let chat = await Chat.findOne({ userIds: { $all: [userId1, userId2] } });
    if (!chat) {
      chat = new Chat({ userIds: [userId1, userId2] });
      await chat.save();
    }
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to start chat', error });
  }
};

export const getChatHistory = async(req,res) =>{
    const {chatId} = req.params;
    console.log(chatId);
    try {
        const chat = await Chat.findById(chatId).populate({
            path: 'messages',
            populate:{
                path: 'senderId',
                select: 'username avatar'
            }
        });
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({message: 'Failed to fetch chat history', error})
    }
}