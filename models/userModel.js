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

const Photo = mongoose.model("User",photoSchema);

export default User;