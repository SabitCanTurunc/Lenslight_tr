import express  from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import cookieParser from "cookie-parser";
import pageRoute from "./routes/pageRaute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import {checkUser} from"./middlewares/authMiddleware.js";

dotenv.config();

//connection to do DB
conn();

const app = express()
const port = process.env.PORT;

// ejs template engine
app.set("view engine", "ejs");


//statics files middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//routers
app.use("*",checkUser);
app.use("/",pageRoute); 
app.use("/photos",photoRoute);
app.use("/users",userRoute);


app.listen(port, ()=> {
    console.log(`Application running on ${port}`);
}); 