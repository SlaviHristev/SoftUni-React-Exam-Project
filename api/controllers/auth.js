import bcrypt from 'bcrypt';
import User from '../Models/User.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create user!" });
    }
};