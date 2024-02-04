import Photo from "../models/photoModel.js";
import {v2 as cloudinary} from 'cloudinary';


const createPhoto = async (req, res) => {

    const result =await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename:true,
            folder: 'lenslight_tr',
        }
    );

    try { 
        // Photo.create bir promise döndürdüğü için await kullanılır
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url,
        });
        res.redirect("/users/dashboard");
    } catch (error) {
        // Hata durumunda hatayı log'la ve kullanıcıya uygun bir hata mesajı gönder
        console.error("Hata oluştu:", error.message);
        res.status(500).json({
            succeeded: false,
            error: error.message,
        });
    }
};

const getAllPhotos = async (req, res) => { // Burada kapanan parantezi ekledim
    try {
        const photos = await Photo.find({});
        res.status(200).render("photos",{
            photos,
            link:"photos",
        });
        
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

const getAPhoto = async (req, res) => { // Burada kapanan parantezi ekledim
    try {
        const photos = await Photo.findById({_id: req.params.id});
        res.status(200).render("photo",{
            photo,
            link:"photos",
        });
        
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

export { createPhoto, getAllPhotos, getAPhoto };
