import express from 'express';
import { get_all_doctors, get_all_users } from '../../controllers/admin/users.js';
import { protect, protectByAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/users', protect, protectByAdmin, get_all_users);
router.get('/doctors', protect, protectByAdmin, get_all_doctors);

export default router;