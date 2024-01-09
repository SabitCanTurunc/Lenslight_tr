import Photo from "../models/photoModel.js";

const createPhoto = (req, res) =>{
    const photo = Photo.create(req.body);
    req.status(201).json({
        succeeded: true,
        photo,
    });
};

export {createPhoto};

