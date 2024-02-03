import express from "express";
import * as pageController from "../controllers/pageController.js";
import * as authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/login").get(pageController.getLoginPage);
router.route("/register").get(authMiddleware.authenticateToken, pageController.getRegisterPage);
router.route("/logout").get(pageController.getLogoutPage);

export default router;