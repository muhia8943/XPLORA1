import { Router } from 'express';
import { getAllTours, getTourById, createTour, updateTour, deleteTour } from '../controllers/admin.controller';

const router = Router();

router.get('/tours', getAllTours);
router.get('/tours/:id', getTourById);
router.post('/tours', createTour);
router.put('/tours/:id', updateTour);
router.delete('/tours/:id', deleteTour);

export default router;
