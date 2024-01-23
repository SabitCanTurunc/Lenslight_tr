import User from "../models/userModel.js";

const createUser = async (req, res) => {
    console.log("req body", req.body);

    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeeded: true,
            user,
        });
    } catch (error) {
        console.error("Hata oluştu:", error.message);
        res.status(500).json({
            succeeded: false,
            error: error.message,
        });
    }
};


export { createUser };
