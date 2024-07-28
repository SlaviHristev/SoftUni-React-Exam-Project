import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../lib/apiRequest';
import useError from './useError';

const useOpenChat = (currentUser) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatReceiver, setChatReceiver] = useState(null);
  const [chatId, setChatId] = useState(null);
  const navigate = useNavigate();
  const { showError } = useError();

  const openChat = async (ownerId) => {
    try {
      const res = await apiRequest.get(`/users/${ownerId}`);
      setChatReceiver(res.data);

      const chatResponse = await apiRequest.post('/chats/startChat', {
        userId1: currentUser._id,
        userId2: ownerId
      });

      setChatId(chatResponse.data._id);
      setIsChatOpen(true);
    } catch (error) {
      console.log('Failed to fetch chat receiver:', error);
      showError('Failed to fetch chat receiver');
    }
  };

  return { isChatOpen, chatReceiver, chatId, openChat, setIsChatOpen };
};

export default useOpenChat;