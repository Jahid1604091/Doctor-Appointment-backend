import express from 'express';
import {
    auth_user,
    booked_appointments,
    complete_profile,
    delete_appointment,
    delete_profile,
    get_profile,
    logout,
    markAllAsRead,
    new_appointment,
    register,
    register_as_doctor,
    update_profile
} from '../controllers/user.js';
import { protect } from '../middleware/auth.js';
import { get_all_approved_doctors } from '../controllers/admin/users.js';

const router = express.Router();

router.post('/', register);
router.post('/auth', auth_user);
router.post('/logout', logout);
router.route('/profile')
    .get(protect, get_profile)
    .put(protect, update_profile)
    .delete(protect, delete_profile);

router.post('/apply-as-doctor', protect, register_as_doctor);
router.put('/mark-all-as-read', protect, markAllAsRead);
router.get('/approved-doctors', protect, get_all_approved_doctors);
router.get('/doctors/:id', protect, get_all_approved_doctors);
router.post('/appointment', protect, new_appointment);
router.get('/booked-appointments', protect, booked_appointments);
router.delete('/appointments/:id', protect, delete_appointment);
router.post('/complete-profile', protect, complete_profile);

export default router;