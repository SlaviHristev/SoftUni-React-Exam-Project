import Car from "../Models/Car.js";

export const addPost = async (req, res) => {
  
    const newPost = new Car({
        ownerId: req.userId,
        ...req.body.data,
    })
    console.log(req.body.data);
    const tokenUserId = req.userId;
    console.log(req.userId);
    try {
       const post = await newPost.save();

        res.status(201).json({
            message: "Post created successfully!",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create post!",
            error: error.message 
        });
    }
};