const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false // Not required for Google OAuth users
  },
  email: {
    type: String,
    required: false // Not required for Google OAuth users
  },
  password: {
    type: String,
    required: false // Not required for Google OAuth users
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Allows null values without violating unique constraint
  }
});

// Only hash password if it's being modified (for local auth users)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords (for local auth users)
UserSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);