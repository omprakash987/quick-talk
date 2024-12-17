

import User from '../models/user.model.js'
import {generateTokenAndSetCookie} from '../lib/utils/generateTokenAndSetCookie.js';
import bcrypt from 'bcryptjs'

export const signup = async(req,res)=>{
try {
    const{fullName, username,email,password} = req.body; 

    // const emailRegex =" ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"; 

     
    const existingUser = await User.findOne({username}); 
    if(existingUser){
        return res.status(400).json({error:"username is already taken "}); 
    }

    const existingEmail = await User.findOne({email}); 

    if(existingEmail){
        return res.status(400).json({
            error:"username is already taken"
        })
    }

    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password,salt); 

    const newUser = new User({
        fullName:fullName,
        email,
        username,
        password:hashedPassword,
    })

    if(newUser){
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save(); 

        res.status(201).json({
            _id:newUser.id,
            fullName:newUser.fullName,
            username:newUser.username,
            email:newUser.email,
            followers:newUser.followers,
            following:newUser.following,
            profileImg:newUser.profileImg,
            coverImg:newUser.coverImg,

        })
    }else{
        res.status(400).json({error:"invalid user data"})
    }


    
} catch (error) {
    console.log("error :",error ); 
    res.status(500).json({error:"error in signUp"})

}
}

export const login = async(req,res)=>{
    try {
        const {username,password} = req.body; 
        const user = await User.findOne({username}); 
        const isPasswordCorrect = bcrypt.compare(password,user?.password || ""); 

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "user is invalid"})
        }
        await generateTokenAndSetCookie(user._id,res); 
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            email:user.email,
            followers:user.followers,
            following:user.following,
            profileImg:user.profileImg,
            coverImg:user.coverImg,
        })
        
    } catch (error) {
        console.log("error : ", error ); 
        return res.status(500).json({error : "error from signIn"})
    }
}


export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0}); 
        res.status(200).json({
            message:"logged out successfully"
        })
    } catch (error) {
            console.log("error : ", error); 
            res.status(500).json({
            error:"logout failed "
        })
    }
}

export const getMe = async(req,res)=>{
    console.log('req.user : ', req.user); 
    try{
        
        const user = await User.findById(req.user._id); 
        res.status(200).json({
            user
        })
    }catch(error){
        console.log("error : ", error ); 
        res.status(500).json({
            error:"get me error ; "
        })
    }
}