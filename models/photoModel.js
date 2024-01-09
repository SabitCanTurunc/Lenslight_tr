import mongoose from "mongoose"; 

const {Schema} = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:ture,
        trim: true 
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

const Photo = mongoose.model("Photo",photoSchema);

export default Photo;