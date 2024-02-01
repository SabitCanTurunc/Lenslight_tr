import User from "../models/userModel.js";
import jwt  from "jsonwebtoken";
const authenticateToken = async (req, res, next)=>{
     
    const token= req.headers["authorization"] && req.headers["authorization"].split(" ")[1]

    
    if (!token){
    return res.status(401).json({
        suceded: false,
        error: "no token avaliable"
    });
    }

    req.user= await User.findById(
        jwt.verify(token, process.env.JWT_SECRET).userID
    );
    next();
};

export { authenticateToken};