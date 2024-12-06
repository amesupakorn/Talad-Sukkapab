import express from "express";
import AuthController from "../database/controllers/authControllers";
import authenticateUser from "../middleware/authMiddleware";
import ProfileController from "../database/controllers/profileControllers";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get("/confirm-email", AuthController.confirmEmail);
router.get("/user", authenticateUser, ProfileController);

export default router;
