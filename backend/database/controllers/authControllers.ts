import { RequestHandler } from "express";
import AuthService from "../services/authServices";
import { CustomError } from "../../types/customError";

const AuthController = {
  signUp: (async (req, res) => {
    try {
      const { username, email, password, confirmPassword } = req.body;
      const user = await AuthService.signUp({ username, email, password, confirmPassword });
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error: unknown) {
      const customError = error as CustomError;
      res.status(customError.statusCode || 400).json({ error: customError.message || "Failed to register user" });
    }
  }) as RequestHandler,

  confirmEmail: (async (req, res) => {
    try {
      const { token } = req.query;
      const response = await AuthService.confirmEmail(token as string);
      res.status(200).json(response);
    } catch (error) {
      res.status((error as CustomError).statusCode || 500).json({ error: (error as CustomError).message });
    }
  }) as RequestHandler,

  signIn: (async (req, res) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await AuthService.signIn({ email, password });
      res.status(200).json({ message: "Sign In successful", token, user });
    } catch (error: unknown) {
      const customError = error as CustomError;
      res.status(customError.statusCode || 400).json({ error: customError.message || "Failed to sign in" });
    }
  }) as RequestHandler,

};



export default AuthController;
