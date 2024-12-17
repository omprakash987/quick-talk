

import mongoose from "mongoose";

const connectMongoDB = async()=>{
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL); 
        console.log("mongo db is connected"); 



    }catch(error){
        console.log("error : ", error); 
        process.exit(1); 

    }
}

export default connectMongoDB; 
