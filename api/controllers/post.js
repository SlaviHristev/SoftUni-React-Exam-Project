import Car from "../Models/Car.js";


export const addPost = async(req,res) =>{
    const {
        title,
        price,
        yearOfMake,
        horsePower,
        color,
        city,
        category,
        fuelType,
        transmission,
        description,
        images
    } = req.body;
    const tokenUserId = req.userId;
    try {
        const newPost = await Car.create({
            title,
            price,
            yearOfMake,
            horsePower,
            color,
            city,
            category,
            fuelType,
            transmission,
            description,
            images,
            ownerId: tokenUserId
        });
        res.status(201).json({
            message: "Post created successfully!",
            post: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create post!"
        });   
    }
}