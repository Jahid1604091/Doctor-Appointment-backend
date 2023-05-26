import express from 'express';
import { protect } from '../middleware/auth.js';
import {get_doctor_by_id} from '../controllers/doctor.js';

const router = express.Router();

router.get('/:id', protect, get_doctor_by_id);

export default router;