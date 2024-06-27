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
        try {
            // Pass only the email to the stored procedure
            const result = await pool.request()
                .input('Email', sql.NVarChar, email)
                .execute('spLoginUser');

            // Check if a user record is found
            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                console.log('User record:', user); // Debugging line

                // Compare the plain-text password with the hashed password from the database
                const isMatch = await bcrypt.compare(password, user.password);
                console.log('Password match:', isMatch); // Debugging line

                if (isMatch) {
                    // Generate a JWT token if passwords match
                    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, {
                        expiresIn: '1h'
                    });
                    return token;
                }
            }
            return null; // Return null if no user is found or passwords do not match
        } catch (error) {
            console.error('Login error:', error); // Debugging line
            throw new Error('Error during login process');
        }
    
    }
    public async getAllUsers(): Promise<User[]> {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Users');
        return result.recordset;
    }

    public async deleteUser(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request().input('id', sql.Int, id).execute('spDeleteUser');
    }
}
