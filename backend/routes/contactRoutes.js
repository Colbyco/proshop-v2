// contactRoutes.js
import express from 'express';
const router = express.Router();
import { sendContactMessage } from '../controllers/contactController.js';

router.route('/contact').post((req, res, next) => {
  console.log('Request received at /api/contact');
  next(); // Call next to continue processing the request
}, sendContactMessage);

// @desc    Get request handler for /contact route
// @route   GET /api/contact
// @access  Public
router.get('/contact', (req, res) => {
    const formData = {
      name: 'Test Name',
      email: 'test@example.com',
      subject: 'Test Subject',
      message: 'Test Message'
    };
  
    console.log('Form Data:', formData);
    res.status(200).json({ message: 'Form data received', formData });
  });

export default router;
