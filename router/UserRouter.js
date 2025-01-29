import { Router } from 'express';
import { Login, SignUp, UpdateUser, DeleteUser, GetUsers , GetUser } from '../controller/UserController.js';



const router = Router();

const userRouter = router;

userRouter
    .route('/login')
    .post(Login)

userRouter
    .route('/signup')
    .post(SignUp)

userRouter
    .route('/updateuser/:id')
    .put(UpdateUser)


userRouter
    .route('/getusers')
    .get(GetUsers)
userRouter
    .route('/getuser/:id')
    .get(GetUser)

userRouter
    .route('/deleteuser/:id')
    .delete(DeleteUser)


export default userRouter;


