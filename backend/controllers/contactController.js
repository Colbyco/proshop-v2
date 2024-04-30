import asyncHandler from '../middleware/asyncHandler.js';
import nodemailer from 'nodemailer';

// @desc    Send contact form data via email
// @route   POST /api/contact
// @access  Public
const sendContactMessage = asyncHandler(async (req, res) => {
  console.log("test")
  const { name, email, subject, message } = req.body;

  // Create a transporter using SMTP
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c5bb7138bcd701",
      pass: "014d58b200b04c"
    }
  });

  // Define email content
  const mailOptions = {
    from: email,
    to: '3a5fbe3a00-43a499+1@inbox.mailtrap.io',
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
