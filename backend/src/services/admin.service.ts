import { poolPromise } from '../config/sql.config';
import { tours } from '../interfaces/admin';
import * as sql from 'mssql';

export class TourService {
    public async getAllTours(): Promise<tours[]> {
        const pool = await poolPromise;
        const result = await pool.request().execute('spGetAllTours');
        return result.recordset;
    }

    public async getTourById(id: number): Promise<tours | null> {
        const pool = await poolPromise;
        const result = await pool.request().input('id', sql.Int, id).execute('spGetTourById');
        return result.recordset.length ? result.recordset[0] : null;
    }

    public async createTour(tour: tours): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('category', sql.NVarChar, tour.category)
            .input('tourdescription', sql.NVarChar, tour.tourdescription)
            .input('duration', sql.NVarChar, tour.duration)
            .execute('spCreateTour');
    }

    public async updateTour(id: number, tour: tours): Promise<void> {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .input('category', sql.NVarChar, tour.category)
            .input('tourdescription', sql.NVarChar, tour.tourdescription)
            .input('duration', sql.NVarChar, tour.duration)
            .execute('spUpdateTour');
    }

    public async deleteTour(id: number): Promise<void> {
        const pool = await poolPromise;
        await pool.request().input('id', sql.Int, id).execute('spDeleteTour');
    }
}
