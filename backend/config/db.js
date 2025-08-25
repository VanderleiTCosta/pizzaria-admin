import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://opcaolanches:opcaolanches@cluster0.wafcx.mongodb.net/pizzaria').then(()=>console.log("DB conectado"));
}