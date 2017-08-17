const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  // mongo is case sensitve when enforcing uniqueness
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// On save hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err) }
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, done) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
    if (err) { return done(err) }
    done(null, isMatch);
  });
}

// Create the model class
const UserModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = UserModelClass;
