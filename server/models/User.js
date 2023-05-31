//require mongoose and schema
const mongoose = require('mongoose');
const {Schema} = mongoose;
//require bcrypt for password hashing
const bcrypt = require('bcrypt');
//require schemas and models 
const Order = require('./Order');
const Upload = require('./Upload');
const Wishlist = require('./Wishlist')
//create user schema
const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    uploads: [{
        type: Schema.Types.ObjectId,
        ref: 'Upload'
    }],
    orders: [Order.Schema],
    wishlist: Wishlist.Schema

});
//pre-save middleware for creating password
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  //compare password with hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };
  //create user model
  const User = mongoose.model('User', userSchema);
  //export user model
  module.exports = User;
  