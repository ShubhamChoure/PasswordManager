import mongoose from "mongoose";
const schema = new mongoose.Schema({website:String,username:String,password:String,passId:String,});

export const model = mongoose.models.Password_Manager || mongoose.model("Password_Manager",schema);
