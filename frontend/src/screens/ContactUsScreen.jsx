import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ContactUsScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
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
