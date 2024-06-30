import mongoose from "mongoose";
const uri = 'mongodb://127.0.0.1:27017/CarShop';

async function dbConnect(){
    await mongoose.connect(uri);
    const Schema = new mongoose.Schema;
};

export default dbConnect;