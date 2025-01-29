import { Router } from 'express';
import { Login, SignUp, UpdateUser, DeleteUser, GetUsers , GetUser } from '../controller/UserController.js';

import  isAuthenticated  from '../middleware/isAuthenticated.js';

const router = Router();

const userRouter = router;

userRouter
    .route('/login')
    .post(Login)

userRouter
    .route('/signup')
    .post(SignUp)

userRouter
    .route('/update')
    .put(isAuthenticated,UpdateUser)


userRouter
    .route('/getusers')
    .get(GetUsers)
userRouter
    .route('/getuser/:id')
    .get(GetUser)

userRouter
    .route('/delete/:id')
    .delete(DeleteUser)


export default userRouter;


