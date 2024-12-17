

import Router from "express"; 
import { protectRoute } from '../middleware/protectRoute.js';
import { createPost,deletePost,commentOnPost,likeUnlikePost ,getAllPost,getLikedPosts,getFllowingPosts,getUserPosts} from '../controllers/post.controller.js';
const router = Router(); 

router.get('/likes/:id',protectRoute,getLikedPosts); 
router.get('/all',protectRoute,getAllPost); 
router.get('/user/:username',protectRoute,getUserPosts); 
router.get('/following',protectRoute,getFllowingPosts); 
router.post('/create',protectRoute,createPost); 
router.delete('/:id',protectRoute,deletePost);
router.post('/like/:id',protectRoute,likeUnlikePost);
router.post('/comment/:id',protectRoute,commentOnPost);

export default router; 
