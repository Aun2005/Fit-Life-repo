const express = require('express');
const router = express.Router();
const Membership = require('../models/Membership');
const { protect, admin } = require('../middleware/auth');

// @route   GET /api/memberships
// @desc    Get all membership plans
// @access  Public
router.get('/', async (req, res) => {
  try {
    const memberships = await Membership.find({ active: true }).sort({ price: 1 });
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch membership plans', error: error.message });
  }
});

// @route   GET /api/memberships/:id
// @desc    Get single membership plan
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    
    if (membership) {
      res.json(membership);
    } else {
      res.status(404).json({ message: 'Membership plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch membership plan', error: error.message });
  }
});

// @route   POST /api/memberships
// @desc    Create new membership plan
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    // Parse features if sent as JSON string
    const membershipData = { ...req.body };
    if (typeof req.body.features === 'string') {
      membershipData.features = JSON.parse(req.body.features);
    }

    const membership = await Membership.create(membershipData);
    res.status(201).json(membership);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create membership plan', error: error.message });
  }
});

// @route   PUT /api/memberships/:id
// @desc    Update membership plan
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (membership) {
      // Update fields
      Object.keys(req.body).forEach(key => {
        if (key === 'features' && typeof req.body[key] === 'string') {
          membership[key] = JSON.parse(req.body[key]);
        } else {
          membership[key] = req.body[key];
        }
      });

      const updatedMembership = await membership.save();
      res.json(updatedMembership);
    } else {
      res.status(404).json({ message: 'Membership plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update membership plan', error: error.message });
  }
});

// @route   DELETE /api/memberships/:id
// @desc    Delete membership plan
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (membership) {
      await membership.deleteOne();
      res.json({ message: 'Membership plan deleted successfully' });
    } else {
      res.status(404).json({ message: 'Membership plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete membership plan', error: error.message });
  }
});

module.exports = router;