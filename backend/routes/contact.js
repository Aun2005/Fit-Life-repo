const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/auth');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      message: 'Your message has been sent successfully! We will get back to you soon.',
      contact
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to send message', 
      error: error.message 
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
  try {
    const contacts = await Contact.find({})
      .populate('repliedBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
  }
});

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private/Admin
router.get('/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('repliedBy', 'name email');
    
    if (contact) {
      // Mark as read
      if (contact.status === 'new') {
        contact.status = 'read';
        await contact.save();
      }
      res.json(contact);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch message', error: error.message });
  }
});

// @route   PUT /api/contact/:id/reply
// @desc    Reply to contact message
// @access  Private/Admin
router.put('/:id/reply', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      contact.reply = req.body.reply;
      contact.status = 'replied';
      contact.repliedBy = req.user._id;
      contact.repliedAt = Date.now();

      const updatedContact = await contact.save();
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to reply to message', error: error.message });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
      await contact.deleteOne();
      res.json({ message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete message', error: error.message });
  }
});

module.exports = router;