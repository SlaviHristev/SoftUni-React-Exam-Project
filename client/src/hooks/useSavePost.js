import { useState, useEffect } from 'react';
import apiRequest from '../lib/apiRequest';
import useError from './useError';

const useSavePost = (currentUser, post) => {
  const [isSaved, setIsSaved] = useState(false);
  const { showError } = useError();

  useEffect(() => {
    const fetchSavedPosts = async () => {
        try {
            const response = await apiRequest.get(`/users/${currentUser?._id}/saved`);
            const savedPosts = response.data;
            setIsSaved(savedPosts.some(savedPost => savedPost?._id === post?._id));
        } catch (error) {
            console.error('Failed to fetch saved posts:', error);
            showError('Failed to fetch saved posts');
        }
    };

    if (currentUser) {
        fetchSavedPosts();
    }
}, [currentUser, post?._id, showError]);

  const handleSavePost = async () => {
    try {
        await apiRequest.post(`/users/save/${post._id}`, { userId: currentUser._id });
        setIsSaved(!isSaved);
        console.log(post.ownerId);
        await apiRequest.post(`/notifications/${post.ownerId._id}`, {
            userId: post.ownerId._id,
            type: 'save',
            message: `${currentUser.username} saved your post.`,
        });
    } catch (error) {
        console.log('Failed to toggle save post:', error);
        showError('Failed to toggle save post');
    }
};

  return { isSaved, handleSavePost };
};

export default useSavePost;