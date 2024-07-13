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