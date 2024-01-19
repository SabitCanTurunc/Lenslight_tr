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

export { createPhoto };
