import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
const secretKey = process.env.JWT_KEY

const { hash, compare } = pkg;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true
    },

    date_of_birth: {
        type: Date,
      
    },

    address: {
        type: String,
        
    },
    phone_number: {
        type: String,
        
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

})

userSchema.pre('save', async function () {
    this.password = await hash(this.password, 10)
})
userSchema.methods.comparePassword = async function (password) {
    return await compare(password, this.password)
}
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id }, secretKey, {
        expiresIn: "15d"
    })
}
const userModel = model("userModel", userSchema)
export default userModel;



