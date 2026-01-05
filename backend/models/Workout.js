const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: {
    type: Number,
    required: true
  },
  reps: {
    type: String,
    required: true
  },
  rest: {
    type: String,
    default: '60 seconds'
  },
  instructions: {
    type: String
  }
});

const workoutSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Workout title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Level is required']
  },
  category: {
    type: String,
    enum: ['chest', 'back', 'legs', 'shoulders', 'arms', 'abs', 'full-body', 'cardio'],
    required: [true, 'Category is required']
  },
  type: {
    type: String,
    enum: ['gym', 'home'],
    required: [true, 'Type is required']
  },
  duration: {
    type: String,
    required: true
  },
  caloriesBurned: {
    type: Number,
    default: 0
  },
  exercises: [exerciseSchema],
  image: {
    type: String,
    default: 'default-workout.jpg'
  },
  videoUrl: {
    type: String
  },
  equipment: [{
    type: String
  }],
  tips: [{
    type: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);