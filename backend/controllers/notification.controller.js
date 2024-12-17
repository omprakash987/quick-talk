import Notification from "../models/notification.model.js";

export const getNotifications = async(req,res)=>{

    try {
        const userId = req.user._id; 
        const notification = await Notification.find({to:userId}).populate({
            path:"from",
            select:"username profileImg",

        })
        await Notification.updateMany({to:userId},{read:true}); 
        res.status(200).json({
            notification
        })
        
    } catch (error) {
        console.log("error ", error ); 
        res.status(500).json({
            error : "error from notification router get Notification"
        })
    }
}

export const deleteNotification = async(req,res)=>{
    
    try {
        const userId = req.user._id; 

        await Notification.deleteMany({to:userId});

        res.status(200).json({message:"notification delete successfully"}); 
        
    } catch (error) {
        console.log("error : ", error); 
        res.status(500).json({
            error:"Internal server error from delete notification"
        })
    }
}