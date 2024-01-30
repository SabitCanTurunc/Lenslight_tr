import User from "../models/userModel.js";
import bcrypt from  "bcrypt";


const createUser = async (req, res) => {

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
const loginUser = async (req, res) => {

    try {
        const { username, password} = req.body;

        console.log("req.body",req.body);

        const user = await User.findOne({username});
        let same= false;

        if(user){
            same= await bcrypt.compare(password, user.password);
            console.log("same",same);

            }else{
                
                return res.status(401).json({
                    succeded: false,
                    error: 'There is no such user',
                });
                }

        if (same){
            res.status(200).send("you are logged in");
        }else{
            res.status(401).json({
                succeded: false,
                error: "password are not mached",
            });
        }

    } catch (error) {
        console.error("Hata oluştu:", error.message);
        res.status(500).json({
            succeeded: false,
            error: error.message,
        });
    }
};


export { createUser,loginUser };
