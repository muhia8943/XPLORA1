import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        await authService.register(req.body);
        res.status(201).send('User registered successfully');
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        if (token) {
            res.json({ token });
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};
