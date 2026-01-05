const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');
const { protect, admin } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/workouts
// @desc    Get all workouts with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { level, category, type } = req.query;
    
    let filter = {};
    if (level) filter.level = level;
    if (category) filter.category = category;
    if (type) filter.type = type;

    const workouts = await Workout.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error: error.message });
  }
});

// @route   GET /api/workouts/:id
// @desc    Get single workout by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (workout) {
      res.json(workout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workout', error: error.message });
  }
});

// @route   POST /api/workouts
// @desc    Create new workout
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const workoutData = {
      ...req.body,
      createdBy: req.user._id
    };

    // Handle image upload
    if (req.file) {
      workoutData.image = req.file.filename;
    }

    // Parse exercises if sent as JSON string
    if (typeof req.body.exercises === 'string') {
      workoutData.exercises = JSON.parse(req.body.exercises);
    }

    // Parse equipment and tips if sent as JSON string
    if (typeof req.body.equipment === 'string') {
      workoutData.equipment = JSON.parse(req.body.equipment);
    }
    if (typeof req.body.tips === 'string') {
      workoutData.tips = JSON.parse(req.body.tips);
    }

    const workout = await Workout.create(workoutData);
    res.status(201).json(workout);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create workout', error: error.message });
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Private/Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      // Update fields
      Object.keys(req.body).forEach(key => {
        if (key !== 'image') {
          if (key === 'exercises' || key === 'equipment' || key === 'tips') {
            workout[key] = typeof req.body[key] === 'string' 
              ? JSON.parse(req.body[key]) 
              : req.body[key];
          } else {
            workout[key] = req.body[key];
          }
        }
      });

      // Update image if new one is uploaded
      if (req.file) {
        workout.image = req.file.filename;
      }

      const updatedWorkout = await workout.save();
      res.json(updatedWorkout);
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to update workout', error: error.message });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (workout) {
      await workout.deleteOne();
      res.json({ message: 'Workout deleted successfully' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete workout', error: error.message });
  }
});

module.exports = router;