import express, { Request, Response, NextFunction } from 'express';
import authRouter from './routers/authRouter';

const app = express();

app.use(express.json());

// Make sure no global middleware is applied before your routes that enforce auth.
// Example:
// app.use(authMiddleware); // <- This would apply authMiddleware to all routes

app.use('/api/auth', authRouter);

// Add error handling middleware if needed
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});

export default app;