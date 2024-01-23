import mongoose from "mongoose"; 

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required,

    }
    },
    {
        timestamp: true,
    }
);

const User = mongoose.model("User",userSchema);

export default User;