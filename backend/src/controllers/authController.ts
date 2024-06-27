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
        // Extract email and password from the request body
        const { email, password } = req.body;
        
        // Call the login method from AuthService
        const token = await authService.login(email, password);
        
        if (token) {
            // If the login is successful, send back the token
            res.json({ token });
        } else {
            // If login fails, send a 401 response
            res.status(401).send('Invalid credentials');
        }
    } catch (error:any) {
        console.error('Login error:', error); // Debugging line
        res.status(500).send(error.message);
    }
};
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await authService.getAllUsers();
        res.json(users);
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await authService.deleteUser(Number(req.params.id));
        res.status(200).send('User deleted successfully.');
    } catch (error:any) {
        res.status(500).send(error.message);
    }
};
