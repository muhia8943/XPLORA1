import { Request, Response } from 'express';
import { TourService } from '../services/admin.service';

const tourService = new TourService();

export const getAllTours = async (req: Request, res: Response) => {
    try {
        const tours = await tourService.getAllTours();
        res.json(tours);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getTourById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        const tour = await tourService.getTourById(id);
        if (tour) {
            res.json(tour);
        } else {
            res.status(404).send('Tour not found');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const createTour = async (req: Request, res: Response) => {
    try {
        await tourService.createTour(req.body);
        res.status(201).send('Tour created successfully');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const updateTour = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await tourService.updateTour(id, req.body);
        res.send('Tour updated successfully');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const deleteTour = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        await tourService.deleteTour(id);
        res.send('Tour deleted successfully');
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};
