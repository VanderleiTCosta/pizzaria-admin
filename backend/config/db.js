import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect('mongodb+srv://vanderleicosta:Derley18@projeto.dnwmwqs.mongodb.net/?retryWrites=true&w=majority&appName=Projeto').then(()=>console.log("DB conectado"));
}