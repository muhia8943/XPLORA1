
import { poolPromise } from '../config/sql.config';
import { User } from '../interfaces/user';
import * as sql from 'mssql';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    public async register(user: User): Promise<void> {
        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await pool.request()
            .input('username', sql.NVarChar, user.username)
            .input('password', sql.NVarChar, hashedPassword)
            .input('role', sql.NVarChar, user.role || 'user')
            .input('uniqueEmail', sql.NVarChar, user.email)
            .execute('spRegisterUser');
    }

    public async login(email: string, password: string): Promise<string | null> {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .execute('spLoginUser');
        
        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
                    expiresIn: '1h'
                });
                return token;
            }
        }
        return null;
    }
}