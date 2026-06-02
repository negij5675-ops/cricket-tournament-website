const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide first name']
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'team-manager', 'player', 'fan'],
    default: 'fan'
  },
  profileImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  city: String,
  state: String,
  country: String,
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
