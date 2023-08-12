import express from 'express';
import { SSLcancel, SSLfailure, SSLipn, SSLsuccess, SSLvalidate, initiateSSL } from '../controllers/ssl.js';
import { protect } from '../middleware/auth.js';
const router = express.Router();


router.post('/ssl-request', protect, initiateSSL);
router.post('/ssl-success', protect, SSLsuccess);
router.post('/ssl-fail', protect, SSLfailure);
router.post('/ssl-cancel', protect, SSLcancel);
router.post('/ssl-ipn', protect, SSLipn);
router.post('/ssl-validate', SSLsuccess, SSLvalidate);

export default router;