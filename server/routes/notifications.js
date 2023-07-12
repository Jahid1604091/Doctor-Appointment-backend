import express from 'express';
import { send_notification } from '../controllers/notifications.js';

const router = express.Router();

router.post('/:id', send_notification)

export default router;