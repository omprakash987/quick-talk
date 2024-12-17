import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';  

export const protectRoute = async (req, res, next) => {
    try {
        console.log('Cookies:', req.cookies); 
         
        const token = req.cookies.jwt;
        console.log('token : ', token)
        if (!token) {
            return res.status(401).json({ error: 'Authentication token is missing' });
        }
 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
 
        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
