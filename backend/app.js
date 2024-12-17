
import {v2 as cloudinary} from 'cloudinary'; 
import express from 'express'; 
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'; 
import connectMongoDB from './db/connectMongoDB.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';
import notifications from './routes/notification.route.js'
import postRoutes from './routes/post.route.js'
import path from 'path'; 

dotenv.config(); 
console.log("cloudname : ", process.env.CLOUDINARY_CLOUD_NAME)

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

const app = express(); 
const __dirname = path.resolve(); 

const PORT = process.env.PORT|| 8000; 
 

app.use(express.json({limit:"5mb"})); 
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser())
app.use('/api/auth',authRoutes); 
app.use('/api/users',userRoutes); 
app.use('/api/posts',postRoutes); 
app.use('/api/notifications',notifications)

app.get("/",(req,res)=>{
    res.send("hello");
})

app.listen(PORT,()=>{
    console.log("server is running on port 8000")
    connectMongoDB();
})