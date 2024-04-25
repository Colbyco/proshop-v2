import asyncHandler from '../middleware/asyncHandler.js';
import nodemailer from 'nodemailer';

// @desc    Send contact form data via email
// @route   POST /api/contact
// @access  Public
const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_password'
    }
  });

  // Define email content
  const mailOptions = {
    from: email,
    to: 'your_corporate_email@example.com',
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

export { sendContactMessage };
