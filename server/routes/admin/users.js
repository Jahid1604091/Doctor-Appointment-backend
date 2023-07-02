import express from 'express';
import {
    approveAsDoctor,
    deleteUser,
    get_all_doctors,
    get_all_users,
    removeAsDoctor
} from '../../controllers/admin/users.js';
import { protect, protectByAdmin } from '../../middleware/auth.js';

const router = express.Router();

router.get('/users', protect, protectByAdmin, get_all_users);
router.delete('/users/:id', protect, protectByAdmin, deleteUser);

router.get('/doctors', protect, protectByAdmin, get_all_doctors);
router.put('/approve-as-doctor/:id', protect, protectByAdmin, approveAsDoctor);
router.put('/remove-as-doctor/:id', protect, protectByAdmin, removeAsDoctor);

export default router;