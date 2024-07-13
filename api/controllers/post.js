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

export const getPosts = async (req, res) => {

    try {
        const posts = await Car.find();

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts" });
    }
};


export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Car.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }
        console.log(post);
        res.status(200).json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to get post" });
    }
}

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;

    try {
        const post = await Car.findById(id);
        if (post.ownerId.toString() !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        await Car.deleteOne({ _id: id });
        res.status(200).json({ message: "Post deleted!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete post" })
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const updatedData = req.body;
    try {
        const post = await Car.findById(id);
        if (post.ownerId.toString() !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized!" });
        }

        const updatedPost = await Car.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedPost);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to update post" });


    }
}

export const getRecent = async (req, res) => {
    try {
        const posts = await Car.find().sort({ createdAt: -1 }).limit(7);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get posts" });
    }
};


export const getPostsByUser = async(req,res) =>{
    try {
      const userId = req.params.userId;
      const posts =  await Car.find({userId: userId}).sort({createdAt: -1});
      res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to get user posts" });
    }
  }