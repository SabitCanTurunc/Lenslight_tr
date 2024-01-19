import Photo from "../models/photoModel.js";

const createPhoto = async (req, res) => {
    console.log("req body", req.body);

    try {
        // Photo.create bir promise döndürdüğü için await kullanılır
        const photo = await Photo.create(req.body);
        res.status(201).json({
            succeeded: true,
            photo,
        });
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
        res.status(200).json({
            succeeded: true,
            photos,
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            error,
        });
    }
};

export { createPhoto, getAllPhotos };
