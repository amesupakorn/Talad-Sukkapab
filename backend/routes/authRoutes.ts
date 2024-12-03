import express from "express";
import AuthController from "../database/controllers/authControllers";
import { ProfileController } from "../database/controllers/profileControllers";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get("/confirm-email", AuthController.confirmEmail);

router.get("/me", authenticateUser, ProfileController); 


export default router;
