import { Request, Response } from 'express';
import ProfileService from '../services/profileServices';
import { CustomError } from '../../types/customError';
import { RequestHandler } from "express";

export const ProfileController = (async (req, res) => {
    try {
        const user = await ProfileService.getUserProfile(req.user!.id);
        res.json(user);

    } catch (error: unknown) {
        res.status((error as CustomError).statusCode || 500).json({ error: (error as CustomError).message });

    }
})as RequestHandler;

