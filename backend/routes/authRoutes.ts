import express from "express";
import AuthController from "../database/controllers/authControllers";


const router = express.Router();

router.post("/signup", AuthController.signUp);
router.post("/signin", AuthController.signIn);

export default router;
