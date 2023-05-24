import express from 'express';
import { auth_user, delete_profile, get_profile, logout, register, register_as_doctor, update_profile } from '../controllers/user.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', register);
router.post('/auth', auth_user);
router.post('/logout', logout);
router.route('/profile')
.get(protect, get_profile)
.put(protect, update_profile)
.delete(protect, delete_profile);

router.post('/doctor', register_as_doctor);

export default router;