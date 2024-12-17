import express, { Router } from 'express'; 
import {protectRoute} from '../middleware/protectRoute.js'
import { getSuggestedUsers, getUserProfile } from '../controllers/user.controller.js';
import { followUnfollowUser } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
const router = Router(); 


router.get("/profile/:username",protectRoute,getUserProfile); 
router.get("/suggested",protectRoute,getSuggestedUsers)
router.post('/follow/:id',protectRoute,followUnfollowUser); 
router.post('/update',protectRoute,updateUser); 

export default router; 
