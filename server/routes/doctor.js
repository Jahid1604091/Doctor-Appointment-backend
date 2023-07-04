import express from 'express';
import { protect } from '../middleware/auth.js';
import {checkAvailability, get_doctor_by_id, get_doctor_by_userId} from '../controllers/doctor.js';

const router = express.Router();

router.get('/:id', protect, get_doctor_by_id);
router.get('/get-doctor/:userId', protect, get_doctor_by_userId);
router.post('/check-availability', protect, checkAvailability);

export default router;