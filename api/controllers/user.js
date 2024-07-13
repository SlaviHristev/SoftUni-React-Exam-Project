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


export const savePost = async(req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.savedPosts.includes(id)) {
            user.savedPosts.push(id);
            await user.save();
        }

        res.status(200).json({ message: 'Post saved successfully' });
    } catch (error) {
        console.log('Failed to save post:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', error });
        }
        res.status(500).json({ message: 'Failed to save post' });
    }
};