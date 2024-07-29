import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const URL = process.env.DATABASE_URL
async function connectDB(){
  try {
    await mongoose.connect(URL)
    console.log("DATABASE CONNECTED...");
  } catch (error) {
    console.log('data',URL);
    console.log('Error',error);
  }
}

export default connectDB
