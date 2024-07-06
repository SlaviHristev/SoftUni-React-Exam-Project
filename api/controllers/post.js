import Car from "../Models/Car.js";

export const addPost = async (req, res) => {
  
    const newPost = new Car({
        ownerId: req.userId,
        ...req.body.data,
    })
   
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

export const getPosts = async(req,res) =>{
    
    try{
        const posts = await Car.find();

        res.status(200).json(posts);
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Failed to get posts" });
    }
};