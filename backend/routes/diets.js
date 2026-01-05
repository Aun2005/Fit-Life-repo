const express = require('express');
const router = express.Router();
const Diet = require('../models/Diet');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/diets
// @desc    Get all diet plans with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { goal } = req.query;
    
    let filter = {};
    if (goal) filter.goal = goal;

    const diets = await Diet.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(diets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch diet plans', error: error.message });
  }
});

// @route   GET /api/diets/:id
// @desc    Get single diet plan by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (diet) {
      res.json(diet);
    } else {
      res.status(404).json({ message: 'Diet plan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch diet plan', error: error.message });
  }
});

// @route   POST /api/diets
// @desc    Create new diet plan
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const dietData = {
      ...req.body,
      createdBy: req.user._id
    };

    // Handle image upload
    if (req.file) {
      dietData.image = req.file.filename;
    }

    // Parse arrays if sent as JSON strings
    if (typeof req.body.meals === 'string') {
      dietData.meals = JSON.parse(req.body.meals);
    }
    if (typeof req.body.guidelines === 'string') {
      dietData.guidelines = JSON.parse(req.body.guidelines);
    }
    if (typeof req.body.restrictions === 'string') {
      dietData.restrictions = JSON.parse(req.body.restrictions);
    }
    if (typeof req.body.supplements === 'string') {
      dietData.supplements = JSON.parse(req.body.supplements);
    }

    const diet = await Diet.create(dietData);
    res.status(201).json(diet);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create diet plan', error: error.message });
  }
});

// @route   PUT /api/diets/:id
// @desc    Update diet plan
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);

    if (diet) {
      // Update fields
      Object.keys(req.body).forEach(key => {
        if (key !== 'image') {
          if (['meals', 'guidelines', 'restrictions', 'supplements'].includes(key)) {
            diet[key] = typeof req.body[key] === 'string' 
              ? JSON.parse(req.body[key]) 
              : req.body[key];
          } else {
            diet[key] = req.body[key];
          }
        }
      });

      // Update image if new one is uploaded
      if (req.file) {
        diet.image = req.file.filename;
      }

      const updatedDiet = await diet.save();
      res.json(updatedDiet);
    } else {
      res.status(404).json({ message: 'Diet plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update diet plan', error: error.message });
  }
});

// @route   DELETE /api/diets/:id
// @desc    Delete diet plan
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const diet = await Diet.findById(req.params.id);

    if (diet) {
      await diet.deleteOne();
      res.json({ message: 'Diet plan deleted successfully' });
    } else {
      res.status(404).json({ message: 'Diet plan not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete diet plan', error: error.message });
  }
});

module.exports = router;