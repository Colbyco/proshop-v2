import express from 'express';
const router = express.Router();
import { sendContactMessage } from '../controllers/contactController.js';

router.route('/').post(sendContactMessage);

export default router;
