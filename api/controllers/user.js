import bcrypt from 'bcrypt';
import User from '../Models/User.js';


export const updateUser = async(req,res) =>{
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password, avatar, ...inputs} = req.body;
    let updatedPass = null;

    if(id !== tokenUserId){
        return res.status(403).json({message: 'Not Authorized!'});
    }
    
    try {
        if(password){
            updatedPass = await bcrypt.hash(password, 10)
        };
        const updateData = {
            ...inputs,
            avatar: avatar || '',
        };

        if (updatedPass) {
            updateData.password = updatedPass;
        }
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to update user' });
    }
}


export const savePost = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.savedPosts.includes(id)) {
            user.savedPosts.pull(id);
            await user.save();
            return res.status(200).json({ message: 'Post unsaved successfully' });
        } else {
            user.savedPosts.push(id); 
            await user.save();
            return res.status(200).json({ message: 'Post saved successfully' });
        }
    } catch (error) {
        console.log('Failed to toggle save post:', error);
        return res.status(500).json({ message: 'Failed to toggle save post' });
    }
}


export const getSavedPosts = async(req,res)=>{
    const {id} = req.params;

    try {
        const user = await User.findById(id).populate('savedPosts');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const savedPosts = user.savedPosts;

        res.status(200).json(savedPosts);

    } catch (error) {
        console.error('Failed to get saved posts:', error);
        res.status(500).json({ message: 'Failed to get saved posts' });
    }
}