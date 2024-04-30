import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSubmitContactFormMutation } from '../slices/contactSlice';
import { useDispatch } from 'react-redux';

const ContactUsScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [submitContactFormMutation] = useSubmitContactFormMutation(); // Define the mutation outside of the component body


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContactFormMutation(formData); // Call the mutation function here
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.message || 'Failed to send message. Please try again later.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Contact Us</h1>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter your name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter your email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId='subject'>
        <Form.Label>Subject</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter subject'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId='message'>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as='textarea'
          rows={5}
          placeholder='Enter your message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Send Message
      </Button>
    </Form>
  );
};

export default ContactUsScreen;
