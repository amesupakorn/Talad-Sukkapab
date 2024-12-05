import express from "express";
import AuthController from "../database/controllers/authControllers";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);
router.get("/confirm-email", AuthController.confirmEmail);

router.get("/me", authenticateUser); 


export default router;
