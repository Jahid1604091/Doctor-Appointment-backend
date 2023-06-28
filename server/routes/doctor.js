import express from 'express';
import { protect } from '../middleware/auth.js';
import {checkAvailability, get_appointments_as_doctor, get_doctor_by_id} from '../controllers/doctor.js';

const router = express.Router();

router.get('/:id', protect, get_doctor_by_id);
router.get('/appointments/doctor/:id', protect, get_appointments_as_doctor);
router.post('/check-availability', protect, checkAvailability);

export default router;