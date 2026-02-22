import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
        select:false
    },
    email: {
        type: String,
        minlength: 10,
        maxlength: 30,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: /^\S+@\S+\.\S+$/
    },
    role: {
        type: String,
        default: "user",
        enum:["user","admin"]
    }
}, {
    versionKey: false,
});

userSchema.set("toJSON",{
    transform:(doc,ret)=>{
        delete ret.password;
        return ret;
    }
})

export const userModel = mongoose.model("users", userSchema);