const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Membership name is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    enum: ['monthly', 'quarterly', 'yearly'],
    required: true
  },
  durationInDays: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  features: [{
    type: String
  }],
  isPopular: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Membership', membershipSchema);