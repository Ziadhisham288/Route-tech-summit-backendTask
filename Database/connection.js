import mongoose from "mongoose"


const connection = async () => {
  return await mongoose.connect("mongodb://localhost:27017/backendTask").then(() => {
    console.log("Database connected successfully")
  }).catch((err) => { 
    console.log({message : "Database connection failed" , error : err})
  })
} 

export default connection;