import express from 'express';
import tourRouter from './routers/admin.routes';
import authRouter from './routers/authRouter';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:4200' // Allow only this origin
}));

app.use(express.json());
app.use('/api', tourRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
