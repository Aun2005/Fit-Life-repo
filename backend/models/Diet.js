const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  foods: [{
    item: String,
    quantity: String
  }],
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  carbs: {
    type: Number,
    required: true
  },
  fats: {
    type: Number,
    required: true
  },
  time: {
    type: String
  }
});

const dietSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Diet plan title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  goal: {
    type: String,
    enum: ['weight-loss', 'muscle-gain', 'maintenance', 'cutting', 'bulking'],
    required: [true, 'Goal is required']
  },
  targetCalories: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  meals: [mealSchema],
  totalProtein: {
    type: Number,
    default: 0
  },
  totalCarbs: {
    type: Number,
    default: 0
  },
  totalFats: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: 'default-diet.jpg'
  },
  guidelines: [{
    type: String
  }],
  restrictions: [{
    type: String
  }],
  supplements: [{
    name: String,
    dosage: String,
    timing: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Calculate total macros before saving
dietSchema.pre('save', function(next) {
  if (this.meals && this.meals.length > 0) {
    this.totalProtein = this.meals.reduce((sum, meal) => sum + meal.protein, 0);
    this.totalCarbs = this.meals.reduce((sum, meal) => sum + meal.carbs, 0);
    this.totalFats = this.meals.reduce((sum, meal) => sum + meal.fats, 0);
  }
  next();
});

module.exports = mongoose.model('Diet', dietSchema);