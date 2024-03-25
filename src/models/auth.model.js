import mongoose from "mongoose";

// const loginSchema = mongoose.Schema({
//     username : {type:String,required:true},
//     password : {type:String,required:true},
//     token : {type:String}
// })

// const LoginModel = mongoose.model('Login',loginSchema);

const UserSchema = new mongoose.Schema({
    firstName : {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:false},
})

const UserModel = mongoose.model('User',UserSchema);

export {
    UserModel,
    // LoginModel
} 