import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                role: string;
                username: string;
                email: string;
                password: string;
                
            };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = {
            id: decoded.id,
            role: decoded.role,
            username: decoded.username,
            email: decoded.email,
            password: decoded.password,
        };
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied.');
    next();
};