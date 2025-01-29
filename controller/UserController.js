
import userModel from "../models/UserModel.js";
import { sendToken } from '../utility/Sendtoken.js';
import ErrorHandler from '../utility/Errorhandler.js';
import catchAsyncError from "../utility/catchAsyncError.js";
import { validate } from 'email-validator';
export const Login = catchAsyncError(  async function Login(req, res) {

   const { email, password } = req.body

   const user = await userModel.findOne({ email }).select("+password");

   if (!user) {
      return res.json({
         message: "user not found"
      })
   }

   const ismatch = await user.comparePassword(password)

   if (ismatch) {
      return sendToken(res, user, `welcome Back ${user}`, 200)
   }

   else {
      res.json({
         message: "please enter correct email or password"
      })
   }
})

export const SignUp = catchAsyncError(async function Signup(req, res, next) {
   const { name, email, password ,username, role, phone, address, dob} = req.body;

   if (!validate(email)) {
      return next(new ErrorHandler(`${email} is not a valid email`, 403))
   }

   const existed = await userModel.findOne({ email })
   if (existed) {
      return next(new ErrorHandler("user already exist", 409))
   }

   const user = await userModel.create({
      username: username,
      email: email,
      password: password,
      name: name,
      address: address,
      dob: dob,
      phone: phone,
      role: role
   })


   if (user) {
      return res.json({
         message: "signup successfull"
      })
   }
   else {
      return next(new ErrorHandler("something went wrong", 501))
   }

})

export const GetUsers = catchAsyncError(async function Signup(req, res, next) {
   
   const users = await userModel.find()
   if (users) {
      return res.json({
         users
      })
   }
   else {
      return next(new ErrorHandler("something went wrong", 501))  
   }
})

export const GetUser = catchAsyncError(async function Signup(req, res, next) {
   const id = req.params.id
   const user = await userModel.findById(id)
   if (user) {
      return res.json({
         user
      })
   }
   else {
      return next(new ErrorHandler("something went wrong", 501))
   }
})



export const UpdateUser = catchAsyncError(async function Signup(req, res, next) {
   const id = req.params.id
   const { name, email, password, username, role, phone_number, address, date_of_birth } = req.body;


   const user = await userModel.findById(id) //getting user from database

   if (name) {
     
      user.name = name
   }

   if (email) {
      user.email = email
   }

   if (password) {
      user.password = password
   }

   if (username) {
      user.username = username
   }

   if (role) {
      user.role = role
   }

   if (phone) {
      user.phone = phone
   }

   if (address) {
      user.address = address
   }

   if (dob) {
      user.dob = dob
   }

   await user.save() //saving the changes

   if (user) {
      return res.json({
         message: "user updated successfully"
      })
   }
   else {
      return next(new ErrorHandler("something went wrong", 501))
   }

})



export const DeleteUser = catchAsyncError(async function DeleteUser(req, res, next) {
   const id = req.params.id


   const user = await userModel.findByIdAndDelete(id)
   if (user) {
      return res.json({
         message: "user deleted successfully"
      })
   }
   else {
      return next(new ErrorHandler("something went wrong", 501))
   }
})






