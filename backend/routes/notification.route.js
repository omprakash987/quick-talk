import { Router } from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { deleteNotification, getNotifications } from "../controllers/notification.controller.js";
const router = Router();

router.get('/', protectRoute, getNotifications);
router.delete('/', protectRoute, deleteNotification);



export default router; 