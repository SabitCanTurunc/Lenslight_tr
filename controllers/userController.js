import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

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
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password);
        } else {

            return res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            });
        }

        if (same) {

            const token = createToken(user._id)
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });


            res.redirect('/users/dashboard');
        } else {
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

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const getDashboardPage = (req, res) => {
    res.render("dashboard", {
        link: "dashboard",
    })
};
export { createUser, loginUser,getDashboardPage };
