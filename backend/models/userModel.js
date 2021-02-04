import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type:String, required: true},
    email:{type: String, required: true, unique:true},
    password:{type:String, default:false, required:true},
    isAdmin:{type:Boolean, default:false, required:true}
}, {
    timestamps: true,
}
);

const User = mongoose.model("users", userSchema);
export default User;
