import express from 'express';
import { protect } from '../middleware/auth.js';
import {approve_appointment, checkAvailability, get_doctor_by_id, get_doctor_by_userId} from '../controllers/doctor.js';

const router = express.Router();

router.get('/:id', protect, get_doctor_by_id);
router.get('/get-doctor/:userId', protect, get_doctor_by_userId);
router.post('/check-availability', protect, checkAvailability);
router.put('/appointments/:appointment_id', protect, approve_appointment);

export default router;