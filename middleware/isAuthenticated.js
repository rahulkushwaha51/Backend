import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import catchAsyncError from '../utility/catchAsyncError.js';
import ErrorHandler  from '../utility/Errorhandler.js';
import userModel from '../models/UserModel.js';

const isAuthenticated = catchAsyncError(async function isAuthenticated(req, res, next) {
   // Get token from Authorization header
   const authHeader = req.headers.authorization;
        
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
       return next(new ErrorHandler("Please provide a valid token", 401));
   }

   // Extract token from "Bearer <token>"
   const token = authHeader.split(' ')[1];

   if (!token) {
       return next(new ErrorHandler("Not Logged In", 401));
   }

    if (!token) return next(new ErrorHandler("Not Logged In", 401))
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await userModel.findById(decoded._id);
    next();
})

export default isAuthenticated;

